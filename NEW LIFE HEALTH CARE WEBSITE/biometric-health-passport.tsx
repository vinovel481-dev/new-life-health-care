"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Fingerprint, Eye, Shield, Zap, Globe, Lock, CheckCircle, QrCode, Smartphone } from "lucide-react"

interface BiometricData {
  fingerprint: boolean
  faceId: boolean
  voiceprint: boolean
  retinaScan: boolean
  heartRatePattern: boolean
  gaitAnalysis: boolean
}

interface HealthPassport {
  id: string
  verified: boolean
  securityLevel: "basic" | "enhanced" | "maximum"
  lastUpdated: string
  globalAccess: boolean
  emergencyAccess: boolean
}

export function BiometricHealthPassport() {
  const [biometrics, setBiometrics] = useState<BiometricData>({
    fingerprint: false,
    faceId: false,
    voiceprint: false,
    retinaScan: false,
    heartRatePattern: false,
    gaitAnalysis: false,
  })

  const [passport, setPassport] = useState<HealthPassport>({
    id: "MHC-2024-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    verified: false,
    securityLevel: "basic",
    lastUpdated: new Date().toISOString(),
    globalAccess: false,
    emergencyAccess: true,
  })

  const [isScanning, setIsScanning] = useState<string | null>(null)

  const scanBiometric = async (type: keyof BiometricData) => {
    setIsScanning(type)

    // Simulate biometric scanning
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setBiometrics((prev) => ({ ...prev, [type]: true }))
    setIsScanning(null)

    // Update security level based on completed biometrics
    const completedCount = Object.values({ ...biometrics, [type]: true }).filter(Boolean).length
    let newSecurityLevel: "basic" | "enhanced" | "maximum" = "basic"

    if (completedCount >= 4) newSecurityLevel = "maximum"
    else if (completedCount >= 2) newSecurityLevel = "enhanced"

    setPassport((prev) => ({
      ...prev,
      securityLevel: newSecurityLevel,
      verified: completedCount >= 2,
      lastUpdated: new Date().toISOString(),
    }))
  }

  const getSecurityColor = (level: string) => {
    switch (level) {
      case "basic":
        return "bg-yellow-100 text-yellow-800"
      case "enhanced":
        return "bg-blue-100 text-blue-800"
      case "maximum":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const completedBiometrics = Object.values(biometrics).filter(Boolean).length
  const totalBiometrics = Object.keys(biometrics).length
  const completionPercentage = (completedBiometrics / totalBiometrics) * 100

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          Biometric Health Passport
        </CardTitle>
        <CardDescription>Ultra-secure biometric identity verification for global healthcare access</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Passport Status */}
        <div className="p-4 border rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-lg">Health Passport ID</h3>
              <p className="font-mono text-sm text-muted-foreground">{passport.id}</p>
            </div>
            <div className="text-right">
              <Badge className={getSecurityColor(passport.securityLevel)}>{passport.securityLevel.toUpperCase()}</Badge>
              {passport.verified && (
                <div className="flex items-center gap-1 mt-1 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-xs">Verified</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Biometric Completion</span>
              <span>
                {completedBiometrics}/{totalBiometrics}
              </span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>
        </div>

        {/* Biometric Scanning Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          <div
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              biometrics.fingerprint ? "bg-green-50 border-green-200" : "hover:bg-muted/50"
            }`}
            onClick={() => !biometrics.fingerprint && scanBiometric("fingerprint")}
          >
            <div className="flex items-center gap-3">
              <div
                className={`h-12 w-12 rounded-full flex items-center justify-center ${
                  isScanning === "fingerprint"
                    ? "bg-primary/20 animate-pulse"
                    : biometrics.fingerprint
                      ? "bg-green-100"
                      : "bg-muted"
                }`}
              >
                <Fingerprint
                  className={`h-6 w-6 ${biometrics.fingerprint ? "text-green-600" : "text-muted-foreground"}`}
                />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Fingerprint Scan</h4>
                <p className="text-xs text-muted-foreground">
                  {isScanning === "fingerprint" ? "Scanning..." : biometrics.fingerprint ? "Verified ✓" : "Tap to scan"}
                </p>
              </div>
            </div>
          </div>

          <div
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              biometrics.faceId ? "bg-green-50 border-green-200" : "hover:bg-muted/50"
            }`}
            onClick={() => !biometrics.faceId && scanBiometric("faceId")}
          >
            <div className="flex items-center gap-3">
              <div
                className={`h-12 w-12 rounded-full flex items-center justify-center ${
                  isScanning === "faceId"
                    ? "bg-primary/20 animate-pulse"
                    : biometrics.faceId
                      ? "bg-green-100"
                      : "bg-muted"
                }`}
              >
                <Eye className={`h-6 w-6 ${biometrics.faceId ? "text-green-600" : "text-muted-foreground"}`} />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Face ID</h4>
                <p className="text-xs text-muted-foreground">
                  {isScanning === "faceId" ? "Scanning..." : biometrics.faceId ? "Verified ✓" : "Tap to scan"}
                </p>
              </div>
            </div>
          </div>

          <div
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              biometrics.voiceprint ? "bg-green-50 border-green-200" : "hover:bg-muted/50"
            }`}
            onClick={() => !biometrics.voiceprint && scanBiometric("voiceprint")}
          >
            <div className="flex items-center gap-3">
              <div
                className={`h-12 w-12 rounded-full flex items-center justify-center ${
                  isScanning === "voiceprint"
                    ? "bg-primary/20 animate-pulse"
                    : biometrics.voiceprint
                      ? "bg-green-100"
                      : "bg-muted"
                }`}
              >
                <Zap className={`h-6 w-6 ${biometrics.voiceprint ? "text-green-600" : "text-muted-foreground"}`} />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Voice Pattern</h4>
                <p className="text-xs text-muted-foreground">
                  {isScanning === "voiceprint"
                    ? "Listening..."
                    : biometrics.voiceprint
                      ? "Verified ✓"
                      : "Tap to record"}
                </p>
              </div>
            </div>
          </div>

          <div
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              biometrics.retinaScan ? "bg-green-50 border-green-200" : "hover:bg-muted/50"
            }`}
            onClick={() => !biometrics.retinaScan && scanBiometric("retinaScan")}
          >
            <div className="flex items-center gap-3">
              <div
                className={`h-12 w-12 rounded-full flex items-center justify-center ${
                  isScanning === "retinaScan"
                    ? "bg-primary/20 animate-pulse"
                    : biometrics.retinaScan
                      ? "bg-green-100"
                      : "bg-muted"
                }`}
              >
                <Eye className={`h-6 w-6 ${biometrics.retinaScan ? "text-green-600" : "text-muted-foreground"}`} />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Retina Scan</h4>
                <p className="text-xs text-muted-foreground">
                  {isScanning === "retinaScan" ? "Scanning..." : biometrics.retinaScan ? "Verified ✓" : "Tap to scan"}
                </p>
              </div>
            </div>
          </div>

          <div
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              biometrics.heartRatePattern ? "bg-green-50 border-green-200" : "hover:bg-muted/50"
            }`}
            onClick={() => !biometrics.heartRatePattern && scanBiometric("heartRatePattern")}
          >
            <div className="flex items-center gap-3">
              <div
                className={`h-12 w-12 rounded-full flex items-center justify-center ${
                  isScanning === "heartRatePattern"
                    ? "bg-primary/20 animate-pulse"
                    : biometrics.heartRatePattern
                      ? "bg-green-100"
                      : "bg-muted"
                }`}
              >
                <Zap
                  className={`h-6 w-6 ${biometrics.heartRatePattern ? "text-green-600" : "text-muted-foreground"}`}
                />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Heart Pattern</h4>
                <p className="text-xs text-muted-foreground">
                  {isScanning === "heartRatePattern"
                    ? "Analyzing..."
                    : biometrics.heartRatePattern
                      ? "Verified ✓"
                      : "Tap to analyze"}
                </p>
              </div>
            </div>
          </div>

          <div
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              biometrics.gaitAnalysis ? "bg-green-50 border-green-200" : "hover:bg-muted/50"
            }`}
            onClick={() => !biometrics.gaitAnalysis && scanBiometric("gaitAnalysis")}
          >
            <div className="flex items-center gap-3">
              <div
                className={`h-12 w-12 rounded-full flex items-center justify-center ${
                  isScanning === "gaitAnalysis"
                    ? "bg-primary/20 animate-pulse"
                    : biometrics.gaitAnalysis
                      ? "bg-green-100"
                      : "bg-muted"
                }`}
              >
                <Smartphone
                  className={`h-6 w-6 ${biometrics.gaitAnalysis ? "text-green-600" : "text-muted-foreground"}`}
                />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Gait Analysis</h4>
                <p className="text-xs text-muted-foreground">
                  {isScanning === "gaitAnalysis"
                    ? "Walking..."
                    : biometrics.gaitAnalysis
                      ? "Verified ✓"
                      : "Tap to walk"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Passport Features */}
        <div className="space-y-4">
          <h4 className="font-semibold">Passport Features</h4>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Globe className="h-5 w-5 text-blue-500" />
              <div>
                <p className="font-medium">Global Healthcare Access</p>
                <p className="text-xs text-muted-foreground">Accepted worldwide</p>
              </div>
              <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
            </div>

            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Lock className="h-5 w-5 text-red-500" />
              <div>
                <p className="font-medium">Emergency Access</p>
                <p className="text-xs text-muted-foreground">Critical situations</p>
              </div>
              <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
            </div>

            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <QrCode className="h-5 w-5 text-purple-500" />
              <div>
                <p className="font-medium">QR Code Access</p>
                <p className="text-xs text-muted-foreground">Quick verification</p>
              </div>
              <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
            </div>

            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Shield className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium">Blockchain Security</p>
                <p className="text-xs text-muted-foreground">Tamper-proof</p>
              </div>
              <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          <p>🔐 Military-grade encryption • 🌍 Global healthcare access • ⚡ Instant verification</p>
        </div>
      </CardContent>
    </Card>
  )
}
