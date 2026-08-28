"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Video,
  Phone,
  MessageCircle,
  Calendar,
  Star,
  Clock,
  MapPin,
  Heart,
  Brain,
  Stethoscope,
  Search,
} from "lucide-react"

interface Doctor {
  id: string
  name: string
  specialty: string
  rating: number
  experience: number
  languages: string[]
  availability: string
  consultationFee: number
  image: string
  location: string
}

const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Priya Sharma",
    specialty: "Cardiologist",
    rating: 4.9,
    experience: 15,
    languages: ["Tamil", "English", "Hindi"],
    availability: "Available now",
    consultationFee: 500,
    image: "/indian-female-doctor.png",
    location: "Chennai Heart Institute",
  },
  {
    id: "2",
    name: "Dr. Rajesh Kumar",
    specialty: "General Physician",
    rating: 4.8,
    experience: 12,
    languages: ["Tamil", "English"],
    availability: "Available in 15 min",
    consultationFee: 300,
    image: "/indian-male-doctor.jpg",
    location: "Apollo Hospital",
  },
  {
    id: "3",
    name: "Dr. Meera Patel",
    specialty: "Pediatrician",
    rating: 4.9,
    experience: 18,
    languages: ["Tamil", "English", "Hindi"],
    availability: "Available in 30 min",
    consultationFee: 400,
    image: "/indian-female-pediatrician.jpg",
    location: "Children's Hospital",
  },
  {
    id: "4",
    name: "Dr. Arjun Reddy",
    specialty: "Neurologist",
    rating: 4.7,
    experience: 20,
    languages: ["Tamil", "English", "Telugu"],
    availability: "Available tomorrow",
    consultationFee: 800,
    image: "/indian-male-neurologist.jpg",
    location: "Neuro Care Center",
  },
]

export function DoctorConsultation() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [consultationType, setConsultationType] = useState<"video" | "audio" | "chat">("video")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredDoctors, setFilteredDoctors] = useState(doctors)
  const [isBooking, setIsBooking] = useState(false)
  const [symptoms, setSymptoms] = useState("")

  useEffect(() => {
    const filtered = doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.languages.some((lang) => lang.toLowerCase().includes(searchQuery.toLowerCase())),
    )
    setFilteredDoctors(filtered)
  }, [searchQuery])

  const getSpecialtyIcon = (specialty: string) => {
    switch (specialty.toLowerCase()) {
      case "cardiologist":
        return <Heart className="h-5 w-5 text-red-500" />
      case "neurologist":
        return <Brain className="h-5 w-5 text-purple-500" />
      case "pediatrician":
        return <Stethoscope className="h-5 w-5 text-blue-500" />
      default:
        return <Stethoscope className="h-5 w-5 text-primary" />
    }
  }

  const handleBookConsultation = async () => {
    if (!selectedDoctor) return

    setIsBooking(true)
    // Simulate booking process
    setTimeout(() => {
      setIsBooking(false)
      alert(`Consultation booked with ${selectedDoctor.name}! You will receive a confirmation shortly.`)
      setSelectedDoctor(null)
      setSymptoms("")
    }, 2000)
  }

  if (selectedDoctor) {
    return (
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={selectedDoctor.image || "/placeholder.svg"} alt={selectedDoctor.name} />
              <AvatarFallback>
                {selectedDoctor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">{selectedDoctor.name}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                {getSpecialtyIcon(selectedDoctor.specialty)}
                {selectedDoctor.specialty} • {selectedDoctor.experience} years exp
              </CardDescription>
              <div className="flex items-center gap-2 mt-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{selectedDoctor.rating}</span>
                <Badge variant="secondary">{selectedDoctor.availability}</Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Button
              variant={consultationType === "video" ? "default" : "outline"}
              onClick={() => setConsultationType("video")}
              className="flex items-center gap-2"
            >
              <Video className="h-4 w-4" />
              Video Call
            </Button>
            <Button
              variant={consultationType === "audio" ? "default" : "outline"}
              onClick={() => setConsultationType("audio")}
              className="flex items-center gap-2"
            >
              <Phone className="h-4 w-4" />
              Audio Call
            </Button>
            <Button
              variant={consultationType === "chat" ? "default" : "outline"}
              onClick={() => setConsultationType("chat")}
              className="flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              Chat
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Describe your symptoms (Tamil/English)</label>
              <Textarea
                placeholder="உங்கள் அறிகுறிகளை விவரிக்கவும் / Describe your symptoms..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="mt-1"
                rows={4}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Doctor Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedDoctor.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedDoctor.availability}</span>
                  </div>
                  <div>
                    <span className="font-medium">Languages: </span>
                    {selectedDoctor.languages.join(", ")}
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Consultation Fee</h4>
                <div className="text-2xl font-bold text-primary">₹{selectedDoctor.consultationFee}</div>
                <p className="text-sm text-muted-foreground">
                  {consultationType === "video" ? "Video" : consultationType === "audio" ? "Audio" : "Chat"}{" "}
                  consultation
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleBookConsultation} disabled={isBooking || !symptoms.trim()} className="flex-1">
              {isBooking ? "Booking..." : `Book ${consultationType} Consultation`}
            </Button>
            <Button variant="outline" onClick={() => setSelectedDoctor(null)}>
              Back to Doctors
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Video className="h-6 w-6 text-primary" />
          Doctor Consultation
        </CardTitle>
        <CardDescription>Connect with certified doctors in Tamil, English & Hindi</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search doctors by name, specialty, or language..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid gap-4">
          {filteredDoctors.map((doctor) => (
            <Card
              key={doctor.id}
              className="border border-muted hover:border-primary/50 transition-colors cursor-pointer"
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={doctor.image || "/placeholder.svg"} alt={doctor.name} />
                    <AvatarFallback>
                      {doctor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{doctor.name}</h3>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">₹{doctor.consultationFee}</div>
                        <div className="text-xs text-muted-foreground">per consultation</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      {getSpecialtyIcon(doctor.specialty)}
                      <span className="text-sm text-muted-foreground">{doctor.specialty}</span>
                      <span className="text-sm text-muted-foreground">• {doctor.experience} years</span>
                    </div>

                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{doctor.rating}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {doctor.availability}
                      </Badge>
                      <div className="text-xs text-muted-foreground">{doctor.languages.join(", ")}</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button onClick={() => setSelectedDoctor(doctor)} className="flex-1">
                    <Video className="mr-2 h-4 w-4" />
                    Consult Now
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No doctors found matching your search.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
