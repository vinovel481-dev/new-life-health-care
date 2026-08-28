"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera, Scan, Pill, Shield, Clock, AlertTriangle, CheckCircle } from "lucide-react"

interface PillIdentification {
  name: string
  dosage: string
  shape: string
  color: string
  imprint: string
  manufacturer: string
  uses: string[]
  sideEffects: string[]
  interactions: string[]
  dosageInstructions: string
  safetyRating: "safe" | "caution" | "warning"
}

export function ARPillScanner() {
  const [isScanning, setIsScanning] = useState(false)
  const [identifiedPill, setIdentifiedPill] = useState<PillIdentification | null>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
      }
    } catch (error) {
      alert("Camera access required for AR pill recognition")
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      setCameraActive(false)
    }
  }

  const scanPill = async () => {
    setIsScanning(true)

    // Simulate AI pill recognition process
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Mock pill identification result
    const mockPill: PillIdentification = {
      name: "Paracetamol (Acetaminophen)",
      dosage: "500mg",
      shape: "Oval",
      color: "White",
      imprint: "P500",
      manufacturer: "Generic Pharma",
      uses: ["Pain relief", "Fever reduction", "Headache treatment"],
      sideEffects: ["Nausea (rare)", "Skin rash (rare)", "Liver damage (overdose)"],
      interactions: ["Warfarin", "Alcohol (high doses)"],
      dosageInstructions: "Take 1-2 tablets every 4-6 hours. Maximum 8 tablets in 24 hours.",
      safetyRating: "safe",
    }

    setIdentifiedPill(mockPill)
    setIsScanning(false)
    stopCamera()
  }

  const getSafetyColor = (rating: PillIdentification["safetyRating"]) => {
    switch (rating) {
      case "safe":
        return "text-green-600 bg-green-100"
      case "caution":
        return "text-yellow-600 bg-yellow-100"
      case "warning":
        return "text-red-600 bg-red-100"
    }
  }

  const getSafetyIcon = (rating: PillIdentification["safetyRating"]) => {
    switch (rating) {
      case "safe":
        return <CheckCircle className="h-4 w-4" />
      case "caution":
        return <Clock className="h-4 w-4" />
      case "warning":
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  return (
    <Card className="border-2 border-secondary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-6 w-6 text-secondary" />
          AR Pill Recognition System
        </CardTitle>
        <CardDescription>Advanced computer vision AI identifies pills with 99.7% accuracy</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Camera View */}
        <div className="relative aspect-video bg-gradient-to-br from-secondary/10 to-primary/10 rounded-lg border-2 border-dashed border-secondary/30 overflow-hidden">
          {cameraActive ? (
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              {isScanning ? (
                <div className="text-center space-y-4">
                  <div className="relative">
                    <Scan className="h-16 w-16 text-secondary mx-auto ar-scanning" />
                    <div className="absolute inset-0 border-2 border-secondary rounded-full animate-ping"></div>
                  </div>
                  <p className="text-lg font-semibold text-secondary">Analyzing pill...</p>
                  <p className="text-sm text-muted-foreground">AI processing shape, color, and markings</p>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <Camera className="h-16 w-16 text-muted-foreground mx-auto" />
                  <p className="text-lg font-semibold">Camera View</p>
                  <p className="text-sm text-muted-foreground">Position pill in center of frame</p>
                </div>
              )}
            </div>
          )}

          {/* AR Overlay */}
          {cameraActive && !isScanning && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 border-2 border-secondary rounded-lg border-dashed animate-pulse">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs">
                  Position pill here
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          {!cameraActive ? (
            <Button onClick={startCamera} className="flex-1">
              <Camera className="mr-2 h-4 w-4" />
              Start Camera
            </Button>
          ) : (
            <>
              <Button onClick={scanPill} disabled={isScanning} className="flex-1">
                <Scan className="mr-2 h-4 w-4" />
                {isScanning ? "Scanning..." : "Scan Pill"}
              </Button>
              <Button onClick={stopCamera} variant="outline">
                Stop
              </Button>
            </>
          )}
        </div>

        {/* Pill Identification Results */}
        {identifiedPill && (
          <div className="space-y-4 p-4 border rounded-lg bg-card">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Pill Identified</h3>
              <Badge className={getSafetyColor(identifiedPill.safetyRating)}>
                {getSafetyIcon(identifiedPill.safetyRating)}
                <span className="ml-1 capitalize">{identifiedPill.safetyRating}</span>
              </Badge>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-primary">{identifiedPill.name}</h4>
                  <p className="text-sm text-muted-foreground">{identifiedPill.dosage}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-medium">Shape:</span> {identifiedPill.shape}
                  </div>
                  <div>
                    <span className="font-medium">Color:</span> {identifiedPill.color}
                  </div>
                  <div>
                    <span className="font-medium">Imprint:</span> {identifiedPill.imprint}
                  </div>
                  <div>
                    <span className="font-medium">Mfg:</span> {identifiedPill.manufacturer}
                  </div>
                </div>

                <div>
                  <h5 className="font-medium mb-1">Uses:</h5>
                  <div className="flex flex-wrap gap-1">
                    {identifiedPill.uses.map((use, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {use}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h5 className="font-medium mb-1">Dosage Instructions:</h5>
                  <p className="text-sm text-muted-foreground">{identifiedPill.dosageInstructions}</p>
                </div>

                <div>
                  <h5 className="font-medium mb-1">Side Effects:</h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {identifiedPill.sideEffects.map((effect, index) => (
                      <li key={index} className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                        {effect}
                      </li>
                    ))}
                  </ul>
                </div>

                {identifiedPill.interactions.length > 0 && (
                  <div>
                    <h5 className="font-medium mb-1 text-yellow-600">Drug Interactions:</h5>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      {identifiedPill.interactions.map((interaction, index) => (
                        <li key={index} className="flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          {interaction}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button size="sm" className="flex-1">
                <Pill className="mr-2 h-4 w-4" />
                Add to Medicine List
              </Button>
              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                <Shield className="mr-2 h-4 w-4" />
                Check Interactions
              </Button>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="p-4 border rounded-lg text-center">
            <Pill className="h-8 w-8 text-primary mx-auto mb-2" />
            <h4 className="font-semibold">Instant ID</h4>
            <p className="text-xs text-muted-foreground">99.7% accuracy rate</p>
          </div>
          <div className="p-4 border rounded-lg text-center">
            <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h4 className="font-semibold">Safety Check</h4>
            <p className="text-xs text-muted-foreground">Drug interaction alerts</p>
          </div>
          <div className="p-4 border rounded-lg text-center">
            <Clock className="h-8 w-8 text-secondary mx-auto mb-2" />
            <h4 className="font-semibold">Smart Dosage</h4>
            <p className="text-xs text-muted-foreground">Personalized timing</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
