"use client";

import { useState, useEffect } from "react";
import { Share2, Mail, QrCode, Copy, Check } from "lucide-react";
import { useToast } from "@/components/toast-context";
import QRCode from "react-qr-code";
import {
  LinkedinShareButton,
  TwitterShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinIcon,
  TwitterIcon,
  FacebookIcon,
  WhatsappIcon,
} from "react-share";

interface ShareButtonProps {
  title: string;
  url: string;
  description?: string;
}

export default function ShareButton({
  title,
  url,
  description,
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleNativeShare = async () => {
    if (isMobile && navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
        showToast("Content shared successfully! 🎉", "success");
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Error sharing:", error);
          showToast("Failed to share content 😕", "error");
        }
      }
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      showToast("Link copied! 📋", "success");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      showToast("Copy failed 😕", "error");
    }
  };

  const handleEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(
      title,
    )}&body=${encodeURIComponent(description + "\n\n" + url)}`;
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleNativeShare}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Share2 className="w-4 h-4" />
        Share
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {/* Social Media Sharing */}
            <div className="px-4 py-2 text-sm font-semibold text-gray-500">
              Share via
            </div>
            <div className="grid grid-cols-4 gap-2 p-2">
              <TwitterShareButton
                url={url}
                title={title}
                className="!flex flex-col items-center"
              >
                <TwitterIcon size={32} round />
                <span className="text-xs font-semibold mt-2">Twitter</span>
              </TwitterShareButton>

              <LinkedinShareButton
                url={url}
                title={title}
                summary={description}
                className="!flex flex-col items-center"
              >
                <LinkedinIcon size={32} round />
                <span className="text-xs font-semibold mt-2">LinkedIn</span>
              </LinkedinShareButton>

              <FacebookShareButton
                url={url}
                hashtag="#blog"
                className="!flex flex-col items-center"
              >
                <FacebookIcon size={32} round />
                <span className="text-xs font-semibold mt-2">Facebook</span>
              </FacebookShareButton>

              <WhatsappShareButton
                url={url}
                title={title}
                separator="\n\n"
                className="!flex flex-col items-center"
              >
                <WhatsappIcon size={32} round />
                <span className="text-xs font-semibold mt-2">WhatsApp</span>
              </WhatsappShareButton>
            </div>

            <div className="border-t border-gray-300 my-2 w-[90%] mx-auto" />

            {/* Other sharing options */}
            <button
              onClick={handleEmail}
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Mail className="w-4 h-4 mr-3" />
              Share via Email
            </button>
            <button
              onClick={handleCopyLink}
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {copied ? (
                <Check className="w-4 h-4 mr-3 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 mr-3" />
              )}
              Copy Link
            </button>
            <button
              onClick={() => setShowQR(true)}
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <QrCode className="w-4 h-4 mr-3" />
              Show QR Code
            </button>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Scan QR Code 📱</h3>
              <button
                onClick={() => setShowQR(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="p-4 bg-white">
              <QRCode value={url} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
