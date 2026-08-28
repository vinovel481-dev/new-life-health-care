"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Brain, TrendingUp, AlertTriangle, Heart, Activity } from "lucide-react"

interface HealthPrediction {
  type: "wellness" | "risk" | "optimization" | "mental"
  title: string
  description: string
  confidence: number
  timeframe: string
  actionable: boolean
}

export function AIHealthPredictor() {
  const [predictions, setPredictions] = useState<HealthPrediction[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const generatePredictions = async () => {
    setIsAnalyzing(true)

    // Simulate AI analysis delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const newPredictions: HealthPrediction[] = [
      {
        type: "wellness",
        title: "Optimal Health Forecast",
        description:
          "Based on your current vitals and lifestyle patterns, you have a 94% probability of maintaining excellent health over the next 30 days.",
        confidence: 94,
        timeframe: "30 days",
        actionable: false,
      },
      {
        type: "risk",
        title: "Dehydration Risk Alert",
        description:
          "Your water intake pattern suggests a 23% increased risk of mild dehydration. Increase daily water consumption by 16oz.",
        confidence: 78,
        timeframe: "7 days",
        actionable: true,
      },
      {
        type: "optimization",
        title: "Medication Timing Optimization",
        description:
          "AI analysis shows 18% better absorption if morning medications are taken 30 minutes after protein intake.",
        confidence: 87,
        timeframe: "Immediate",
        actionable: true,
      },
      {
        type: "mental",
        title: "Sleep Quality Enhancement",
        description:
          "Your circadian rhythm data indicates 25% mood improvement potential with 7.5-hour sleep cycles starting at 10:30 PM.",
        confidence: 91,
        timeframe: "14 days",
        actionable: true,
      },
    ]

    setPredictions(newPredictions)
    setIsAnalyzing(false)
  }

  useEffect(() => {
    generatePredictions()
  }, [])

  const getTypeIcon = (type: HealthPrediction["type"]) => {
    switch (type) {
      case "wellness":
        return <Heart className="h-5 w-5 text-green-600" />
      case "risk":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "optimization":
        return <TrendingUp className="h-5 w-5 text-blue-600" />
      case "mental":
        return <Brain className="h-5 w-5 text-purple-600" />
    }
  }

  const getTypeColor = (type: HealthPrediction["type"]) => {
    switch (type) {
      case "wellness":
        return "border-green-200 bg-green-50"
      case "risk":
        return "border-yellow-200 bg-yellow-50"
      case "optimization":
        return "border-blue-200 bg-blue-50"
      case "mental":
        return "border-purple-200 bg-purple-50"
    }
  }

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          AI Health Prediction Engine
        </CardTitle>
        <CardDescription>
          Advanced machine learning algorithms analyze your health data to predict future conditions and optimize
          wellness
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {isAnalyzing ? (
          <div className="text-center py-8">
            <div className="relative">
              <Activity className="h-16 w-16 text-primary mx-auto animate-pulse" />
              <div className="absolute inset-0 border-2 border-primary rounded-full animate-ping opacity-30"></div>
            </div>
            <p className="mt-4 text-lg font-semibold">AI Analyzing Health Data...</p>
            <p className="text-sm text-muted-foreground">Processing 847 data points</p>
          </div>
        ) : (
          <div className="space-y-4">
            {predictions.map((prediction, index) => (
              <div key={index} className={`p-4 border rounded-lg ${getTypeColor(prediction.type)}`}>
                <div className="flex items-start gap-3">
                  {getTypeIcon(prediction.type)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{prediction.title}</h4>
                      <span className="text-xs bg-white/50 px-2 py-1 rounded">{prediction.timeframe}</span>
                    </div>
                    <p className="text-sm mb-3">{prediction.description}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Confidence</span>
                          <span>{prediction.confidence}%</span>
                        </div>
                        <Progress value={prediction.confidence} className="h-2" />
                      </div>
                      {prediction.actionable && (
                        <Button size="sm" variant="outline">
                          Take Action
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <Button onClick={generatePredictions} disabled={isAnalyzing} className="w-full">
          <Brain className="mr-2 h-4 w-4" />
          {isAnalyzing ? "Analyzing..." : "Generate New Predictions"}
        </Button>
      </CardContent>
    </Card>
  )
}
