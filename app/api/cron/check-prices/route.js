import { sendPriceDropAlert } from "@/lib/email";
import { scrapeProduct } from "@/lib/firecrawl";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        message: "Price check endpoint is working"
    })
}

export async function POST(request) {
    try {
        const authHeader = request.headers.get("authorization")
        const cronSecret = process.env.CRON_SECRET

        if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE_KEY
        )

        const { data: products, error: productsError } = await supabase
            .from("products")
            .select("*")

        if (productsError) throw productsError

        console.log(`Found ${products.length} products to check`);

        const results = {
            total: products.length,
            updated: 0,
            failed: 0,
            priceChanges: 0,
            alertsSent: 0,
            debug: []
        }

        for (const product of products) {
            try {
                const productData = await scrapeProduct(product.url)

                if (!productData.currentPrice) {
                    results.failed++;
                    results.debug.push({
                        id: product.id,
                        error: "No currentPrice from scrape"
                    });
                    continue;
                }

                const newPrice = parseFloat(productData.currentPrice)
                const oldPrice = parseFloat(product.current_price)

                const debugEntry = {
                    id: product.id,
                    name: product.name,
                    oldPrice,
                    newPrice,
                    priceDrop: newPrice < oldPrice,
                    alertTriggered: false
                };

                await supabase.from("products").update({
                    current_price: newPrice,
                    currency: productData.currencyCode || product.currency,
                    name: productData.productName || product.name,
                    img_url: productData.productImageUrl || product.img_url,
                    updated_at: new Date().toISOString(),
                })
                    .eq("id", product.id)

                if (oldPrice != newPrice) {
                    await supabase.from("price_history").insert({
                        product_id: product.id,
                        price: newPrice,
                        currency: productData.currencyCode || product.currency
                    })

                    results.priceChanges++

                    if (newPrice < oldPrice) {
                        const {
                            data: { user },
                        } = await supabase.auth.admin.getUserById(product.user_id)

                        debugEntry.userFound = !!user;
                        debugEntry.userEmail = user?.email;

                        if (user?.email) {
                            const emailResult = await sendPriceDropAlert(
                                user.email,
                                product,
                                oldPrice,
                                newPrice
                            )

                            debugEntry.emailResult = emailResult;

                            if (emailResult.success) {
                                results.alertsSent++
                                debugEntry.alertTriggered = true;
                            }
                        }
                    }
                }
                results.debug.push(debugEntry);

                results.updated++

            } catch (error) {
                console.log(error);
                results.failed++
                results.debug.push({
                    id: product.id,
                    error: error.message
                });
            }
        }

        return NextResponse.json({
            success: true,
            message: "Price check completed",
            results
        })
    } catch (error) {
        console.error("Cron job error", error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}