"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Video, Globe, Scan, Heart, Brain, Stethoscope, Calendar, Clock } from "lucide-react"

interface Doctor {
  id: string
  name: string
  specialty: string
  rating: number
  availability: "available" | "busy" | "offline"
  nextAvailable?: string
  languages: string[]
  experience: number
}

export function HolographicTelemedicine() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [hologramActive, setHologramActive] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)

  const doctors: Doctor[] = [
    {
      id: "1",
      name: "Dr. Sarah Chen",
      specialty: "Cardiology",
      rating: 4.9,
      availability: "available",
      languages: ["English", "Mandarin"],
      experience: 15,
    },
    {
      id: "2",
      name: "Dr. Michael Torres",
      specialty: "Neurology",
      rating: 4.8,
      availability: "available",
      nextAvailable: "15 minutes",
      languages: ["English", "Spanish"],
      experience: 12,
    },
    {
      id: "3",
      name: "Dr. Priya Patel",
      specialty: "Internal Medicine",
      rating: 4.9,
      availability: "busy",
      nextAvailable: "2 hours",
      languages: ["English", "Hindi", "Gujarati"],
      experience: 18,
    },
    {
      id: "4",
      name: "Dr. James Wilson",
      specialty: "Emergency Medicine",
      rating: 4.7,
      availability: "available",
      languages: ["English"],
      experience: 10,
    },
  ]

  const startHologramConsultation = async (doctor: Doctor) => {
    setSelectedDoctor(doctor)
    setIsConnecting(true)

    // Simulate connection process
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsConnecting(false)
    setHologramActive(true)

    // Simulate hologram session
    setTimeout(() => {
      setHologramActive(false)
      alert(`Holographic consultation with ${doctor.name} completed successfully!`)
    }, 5000)
  }

  const getAvailabilityColor = (availability: Doctor["availability"]) => {
    switch (availability) {
      case "available":
        return "bg-green-100 text-green-800"
      case "busy":
        return "bg-yellow-100 text-yellow-800"
      case "offline":
        return "bg-red-100 text-red-800"
    }
  }

  const getSpecialtyIcon = (specialty: string) => {
    switch (specialty.toLowerCase()) {
      case "cardiology":
        return <Heart className="h-5 w-5 text-red-500" />
      case "neurology":
        return <Brain className="h-5 w-5 text-purple-500" />
      case "internal medicine":
        return <Stethoscope className="h-5 w-5 text-blue-500" />
      case "emergency medicine":
        return <Stethoscope className="h-5 w-5 text-orange-500" />
      default:
        return <Stethoscope className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <Card className="border-2 border-secondary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="h-6 w-6 text-secondary" />
          Holographic Telemedicine
        </CardTitle>
        <CardDescription>
          Revolutionary 3D holographic consultations with healthcare professionals worldwide
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Hologram Display Area */}
        <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg border-2 border-dashed border-secondary/30 overflow-hidden">
          {hologramActive ? (
            <div className="absolute inset-0 flex items-center justify-center hologram-effect">
              <div className="text-center space-y-4">
                <div className="relative">
                  <div className="h-40 w-40 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full mx-auto flex items-center justify-center border-4 border-secondary/50">
                    <div className="h-20 w-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                      {selectedDoctor && getSpecialtyIcon(selectedDoctor.specialty)}
                    </div>
                  </div>
                  <div className="absolute inset-0 border-2 border-secondary rounded-full animate-ping opacity-30"></div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs">
                    Dr. {selectedDoctor?.name.split(" ")[1]}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-secondary">Hologram Active</p>
                  <p className="text-sm text-muted-foreground">3D consultation in progress</p>
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Real-time interaction</span>
                  </div>
                </div>
              </div>
            </div>
          ) : isConnecting ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="relative">
                  <Video className="h-16 w-16 text-secondary mx-auto animate-pulse" />
                  <div className="absolute inset-0 border-2 border-secondary rounded-full animate-ping opacity-30"></div>
                </div>
                <p className="text-lg font-semibold text-secondary">Initializing Hologram...</p>
                <p className="text-sm text-muted-foreground">Rendering 3D doctor avatar</p>
                <div className="w-48 bg-muted rounded-full h-2 mx-auto">
                  <div className="bg-secondary h-2 rounded-full animate-pulse" style={{ width: "75%" }}></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <Video className="h-16 w-16 text-muted-foreground mx-auto" />
                <p className="text-lg font-semibold">Holographic Consultation Space</p>
                <p className="text-sm text-muted-foreground">Next-generation 3D medical consultations</p>
              </div>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="p-4 border rounded-lg text-center">
            <Video className="h-8 w-8 text-primary mx-auto mb-2" />
            <h4 className="font-semibold">3D Interaction</h4>
            <p className="text-xs text-muted-foreground">Lifelike presence</p>
          </div>
          <div className="p-4 border rounded-lg text-center">
            <Scan className="h-8 w-8 text-secondary mx-auto mb-2" />
            <h4 className="font-semibold">AR Diagnosis</h4>
            <p className="text-xs text-muted-foreground">Visual examination</p>
          </div>
          <div className="p-4 border rounded-lg text-center">
            <Globe className="h-8 w-8 text-primary mx-auto mb-2" />
            <h4 className="font-semibold">Global Access</h4>
            <p className="text-xs text-muted-foreground">Worldwide specialists</p>
          </div>
        </div>

        {/* Available Doctors */}
        <div className="space-y-4">
          <h4 className="font-semibold flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-primary" />
            Available Specialists
          </h4>
          <div className="grid gap-3 md:grid-cols-2">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                  {getSpecialtyIcon(doctor.specialty)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{doctor.name}</p>
                    <Badge className={getAvailabilityColor(doctor.availability)}>{doctor.availability}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                    <span>⭐ {doctor.rating}</span>
                    <span>{doctor.experience}y exp</span>
                    <span>{doctor.languages.join(", ")}</span>
                  </div>
                  {doctor.nextAvailable && doctor.availability !== "available" && (
                    <p className="text-xs text-muted-foreground mt-1">
                      <Clock className="h-3 w-3 inline mr-1" />
                      Available in {doctor.nextAvailable}
                    </p>
                  )}
                </div>
                <Button
                  size="sm"
                  onClick={() => startHologramConsultation(doctor)}
                  disabled={doctor.availability !== "available" || isConnecting || hologramActive}
                  className="shrink-0"
                >
                  {doctor.availability === "available" ? "Connect" : "Schedule"}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-2 md:grid-cols-2">
          <Button variant="outline" className="h-12 bg-transparent">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Appointment
          </Button>
          <Button variant="outline" className="h-12 bg-transparent">
            <Globe className="mr-2 h-4 w-4" />
            Emergency Consultation
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
