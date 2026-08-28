"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Zap, Atom, AlertTriangle, CheckCircle } from "lucide-react"

interface QuantumScanResult {
  cellularHealth: number
  dnaIntegrity: number
  metabolicEfficiency: number
  immuneStrength: number
  oxidativeStress: number
  recommendations: string[]
  riskFactors: string[]
}

export function QuantumHealthScanner() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [scanResult, setScanResult] = useState<QuantumScanResult | null>(null)

  const startQuantumScan = async () => {
    setIsScanning(true)
    setScanProgress(0)
    setScanResult(null)

    // Simulate quantum scanning process
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsScanning(false)

          // Generate mock quantum scan results
          setScanResult({
            cellularHealth: 87,
            dnaIntegrity: 94,
            metabolicEfficiency: 82,
            immuneStrength: 91,
            oxidativeStress: 23,
            recommendations: [
              "Increase antioxidant intake by 15% to reduce cellular oxidation",
              "Optimize sleep cycles for enhanced DNA repair mechanisms",
              "Consider intermittent fasting to boost metabolic efficiency",
              "Add omega-3 supplements for improved cellular membrane health",
            ],
            riskFactors: [
              "Elevated cortisol levels detected in cellular analysis",
              "Minor mitochondrial inefficiency in energy production",
            ],
          })
          return 100
        }
        return prev + 2
      })
    }, 100)
  }

  const getHealthColor = (value: number) => {
    if (value >= 90) return "text-green-600"
    if (value >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getHealthBg = (value: number) => {
    if (value >= 90) return "bg-green-100"
    if (value >= 70) return "bg-yellow-100"
    return "bg-red-100"
  }

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Atom className="h-6 w-6 text-primary" />
          Quantum Health Scanner
        </CardTitle>
        <CardDescription>
          Revolutionary quantum-level cellular analysis using advanced biofield scanning technology
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Scanning Interface */}
        <div className="relative aspect-square max-w-sm mx-auto bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full border-4 border-primary/20 flex items-center justify-center overflow-hidden">
          {isScanning ? (
            <div className="text-center space-y-4">
              <div className="relative">
                <Atom className="h-20 w-20 text-primary mx-auto animate-spin" />
                <div className="absolute inset-0 border-4 border-primary rounded-full animate-ping opacity-30"></div>
                <div className="absolute inset-4 border-2 border-secondary rounded-full animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-primary">Quantum Scanning...</p>
                <p className="text-sm text-muted-foreground">Analyzing cellular biofield</p>
                <Progress value={scanProgress} className="w-32 mx-auto" />
                <p className="text-xs text-muted-foreground">{scanProgress}% Complete</p>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <Zap className="h-20 w-20 text-muted-foreground mx-auto" />
              <p className="text-lg font-semibold">Quantum Scanner Ready</p>
              <p className="text-sm text-muted-foreground">Advanced cellular analysis</p>
            </div>
          )}
        </div>

        {/* Scan Results */}
        {scanResult && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-primary mb-2">Quantum Analysis Complete</h3>
              <p className="text-sm text-muted-foreground">Cellular-level health assessment</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className={`p-4 rounded-lg border ${getHealthBg(scanResult.cellularHealth)}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Cellular Health</span>
                  <span className={`font-bold ${getHealthColor(scanResult.cellularHealth)}`}>
                    {scanResult.cellularHealth}%
                  </span>
                </div>
                <Progress value={scanResult.cellularHealth} className="h-2" />
              </div>

              <div className={`p-4 rounded-lg border ${getHealthBg(scanResult.dnaIntegrity)}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">DNA Integrity</span>
                  <span className={`font-bold ${getHealthColor(scanResult.dnaIntegrity)}`}>
                    {scanResult.dnaIntegrity}%
                  </span>
                </div>
                <Progress value={scanResult.dnaIntegrity} className="h-2" />
              </div>

              <div className={`p-4 rounded-lg border ${getHealthBg(scanResult.metabolicEfficiency)}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Metabolic Efficiency</span>
                  <span className={`font-bold ${getHealthColor(scanResult.metabolicEfficiency)}`}>
                    {scanResult.metabolicEfficiency}%
                  </span>
                </div>
                <Progress value={scanResult.metabolicEfficiency} className="h-2" />
              </div>

              <div className={`p-4 rounded-lg border ${getHealthBg(scanResult.immuneStrength)}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Immune Strength</span>
                  <span className={`font-bold ${getHealthColor(scanResult.immuneStrength)}`}>
                    {scanResult.immuneStrength}%
                  </span>
                </div>
                <Progress value={scanResult.immuneStrength} className="h-2" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Quantum Recommendations
                </h4>
                <div className="space-y-2">
                  {scanResult.recommendations.map((rec, index) => (
                    <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-700">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>

              {scanResult.riskFactors.length > 0 && (
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Areas for Attention
                  </h4>
                  <div className="space-y-2">
                    {scanResult.riskFactors.map((risk, index) => (
                      <div key={index} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-700">{risk}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <Button
          onClick={startQuantumScan}
          disabled={isScanning}
          className="w-full h-12 text-lg bg-gradient-to-r from-primary to-primary/80"
        >
          <Atom className="mr-2 h-5 w-5" />
          {isScanning ? "Scanning..." : "Start Quantum Health Scan"}
        </Button>

        <div className="text-center text-xs text-muted-foreground">
          <p>🔬 Quantum biofield analysis • ⚛️ Cellular-level insights • 🧬 DNA integrity assessment</p>
        </div>
      </CardContent>
    </Card>
  )
}