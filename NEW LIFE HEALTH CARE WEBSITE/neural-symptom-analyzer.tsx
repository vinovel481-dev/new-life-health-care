"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, Mic, MessageSquare, Zap, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react"

interface SymptomAnalysis {
  primaryConditions: Array<{
    name: string
    probability: number
    severity: "low" | "medium" | "high"
    description: string
  }>
  recommendations: string[]
  urgencyLevel: "routine" | "urgent" | "emergency"
  confidence: number
}

export function NeuralSymptomAnalyzer() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [symptoms, setSymptoms] = useState("")
  const [analysis, setAnalysis] = useState<SymptomAnalysis | null>(null)

  const startVoiceInput = async () => {
    setIsListening(true)

    // Simulate voice recognition
    setTimeout(() => {
      setSymptoms("I have been experiencing headaches, fatigue, and difficulty concentrating for the past week")
      setIsListening(false)
    }, 3000)
  }

  const analyzeSymptoms = async () => {
    if (!symptoms.trim()) return

    setIsAnalyzing(true)

    // Simulate neural network analysis
    await new Promise((resolve) => setTimeout(resolve, 4000))

    const mockAnalysis: SymptomAnalysis = {
      primaryConditions: [
        {
          name: "Tension Headache",
          probability: 87,
          severity: "medium",
          description: "Common headache type often caused by stress, poor posture, or eye strain",
        },
        {
          name: "Sleep Deprivation Syndrome",
          probability: 73,
          severity: "medium",
          description: "Insufficient or poor-quality sleep affecting cognitive function",
        },
        {
          name: "Mild Dehydration",
          probability: 65,
          severity: "low",
          description: "Inadequate fluid intake leading to fatigue and concentration issues",
        },
        {
          name: "Digital Eye Strain",
          probability: 58,
          severity: "low",
          description: "Eye fatigue from prolonged screen use causing headaches",
        },
      ],
      recommendations: [
        "Increase water intake to 8-10 glasses daily",
        "Practice stress reduction techniques like deep breathing",
        "Ensure 7-9 hours of quality sleep nightly",
        "Take regular breaks from screen time (20-20-20 rule)",
        "Consider over-the-counter pain relief if headaches persist",
      ],
      urgencyLevel: "routine",
      confidence: 89,
    }

    setAnalysis(mockAnalysis)
    setIsAnalyzing(false)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "routine":
        return "text-green-600"
      case "urgent":
        return "text-yellow-600"
      case "emergency":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Card className="border-2 border-secondary/20 bg-gradient-to-br from-secondary/5 to-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-secondary" />
          Neural Symptom Analyzer
        </CardTitle>
        <CardDescription>Advanced AI neural networks analyze symptoms with medical-grade accuracy</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Describe your symptoms</label>
            <div className="relative">
              <Input
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Tell me about what you're experiencing..."
                className="pr-12"
                disabled={isListening}
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-1 top-1 h-8 w-8 p-0"
                onClick={startVoiceInput}
                disabled={isListening}
              >
                <Mic className={`h-4 w-4 ${isListening ? "text-red-500 animate-pulse" : "text-muted-foreground"}`} />
              </Button>
            </div>
            {isListening && <p className="text-sm text-red-500 animate-pulse">🎤 Listening...</p>}
          </div>

          <Button
            onClick={analyzeSymptoms}
            disabled={!symptoms.trim() || isAnalyzing || isListening}
            className="w-full h-12 text-lg"
          >
            {isAnalyzing ? (
              <>
                <Brain className="mr-2 h-5 w-5 animate-pulse" />
                Neural Analysis in Progress...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-5 w-5" />
                Analyze Symptoms with AI
              </>
            )}
          </Button>
        </div>

        {/* Analysis Progress */}
        {isAnalyzing && (
          <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
            <div className="text-center">
              <Brain className="h-12 w-12 text-secondary mx-auto animate-pulse mb-2" />
              <p className="font-semibold">Neural Network Processing</p>
              <p className="text-sm text-muted-foreground">Analyzing symptom patterns...</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Pattern Recognition</span>
                <span>94%</span>
              </div>
              <Progress value={94} className="h-2" />
              <div className="flex justify-between text-sm">
                <span>Medical Database Matching</span>
                <span>87%</span>
              </div>
              <Progress value={87} className="h-2" />
              <div className="flex justify-between text-sm">
                <span>Risk Assessment</span>
                <span>91%</span>
              </div>
              <Progress value={91} className="h-2" />
            </div>
          </div>
        )}

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-6">
            <div className="text-center p-4 border rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10">
              <h3 className="text-xl font-bold text-primary mb-2">Analysis Complete</h3>
              <div className="flex items-center justify-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  Confidence: {analysis.confidence}%
                </span>
                <span className={`flex items-center gap-1 ${getUrgencyColor(analysis.urgencyLevel)}`}>
                  <AlertTriangle className="h-4 w-4" />
                  {analysis.urgencyLevel.charAt(0).toUpperCase() + analysis.urgencyLevel.slice(1)}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Possible Conditions</h4>
              {analysis.primaryConditions.map((condition, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="font-semibold">{condition.name}</h5>
                    <div className="flex items-center gap-2">
                      <Badge className={getSeverityColor(condition.severity)}>{condition.severity}</Badge>
                      <span className="text-sm font-medium">{condition.probability}%</span>
                    </div>
                  </div>
                  <Progress value={condition.probability} className="h-2" />
                  <p className="text-sm text-muted-foreground">{condition.description}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-green-800 flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                AI Recommendations
              </h4>
              <div className="space-y-2">
                {analysis.recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-green-800">{index + 1}</span>
                    </div>
                    <p className="text-sm text-green-700">{rec}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1 bg-transparent" variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Consult Doctor
              </Button>
              <Button className="flex-1 bg-transparent" variant="outline">
                <Brain className="mr-2 h-4 w-4" />
                Get Second Opinion
              </Button>
            </div>
          </div>
        )}

        <div className="text-center text-xs text-muted-foreground">
          <p>🧠 Advanced neural networks • 🎯 Medical-grade accuracy • ⚡ Real-time analysis</p>
        </div>
      </CardContent>
    </Card>
  )
}
