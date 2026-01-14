"use client"
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { AuthModal } from './AuthModal'
import { addProduct } from '@/app/action'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const AddProductForm = ({ user }) => {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [showAuthModal, setshowAuthModal] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      setshowAuthModal(true)
      return;
    }
    setLoading(true)
    const formData = new FormData()
    formData.append("url", url)

    const result = await addProduct(formData)

    if (result.error) {
      toast.error(result.error)
    }
    else {
      toast.success(result.message || "Product tracked successfully")
      setUrl("");
    }
    setLoading(false)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-xl">
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste product link here..."
            className="h-14 text-base bg-transparent text-white placeholder:text-gray-400 border-none focus-visible:ring-0"
            required
            disabled={loading}
          />

          <Button
            type="submit"
            disabled={loading}
            className="h-14 px-10 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 hover:opacity-90 transition cursor-pointer"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Tracking
              </>
            ) : (
              "Track Now"
            )}
          </Button>
        </div>
      </form>


      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setshowAuthModal(false)}
      />
    </>
  )
}

export default AddProductForm