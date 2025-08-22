"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { University } from "@/lib/universities-data"
import { MapPin, Users, ExternalLink, Heart } from "lucide-react"
import Image from "next/image"

interface UniversityCardProps {
  university: University
  onViewDetails: (university: University) => void
}

export function UniversityCard({ university, onViewDetails }: UniversityCardProps) {
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Image
              src={university.logo || "/placeholder.svg"}
              alt={`${university.name} logo`}
              width={60}
              height={60}
              className="rounded-lg"
            />
            <div>
              <h3 className="font-bold text-lg leading-tight">{university.name}</h3>
              <div className="flex items-center text-muted-foreground text-sm mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                {university.city}, {university.country}
              </div>
            </div>
          </div>
          <div className="text-right">
            <Badge variant="secondary" className="mb-2">
              #{university.ranking}
            </Badge>
            <Button variant="ghost" size="sm">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{university.description}</p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Стоимость:</span>
            <p className="text-muted-foreground">
              {formatCurrency(university.tuitionFee.min, university.tuitionFee.currency)}
              {university.tuitionFee.min !== university.tuitionFee.max &&
                ` - ${formatCurrency(university.tuitionFee.max, university.tuitionFee.currency)}`}
            </p>
          </div>
          <div>
            <span className="font-medium">Прием:</span>
            <p className="text-muted-foreground">{university.acceptanceRate}%</p>
          </div>
        </div>

        <div>
          <span className="font-medium text-sm">Требования:</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {university.requirements.ielts && <Badge variant="outline">IELTS {university.requirements.ielts}</Badge>}
            {university.requirements.toefl && <Badge variant="outline">TOEFL {university.requirements.toefl}</Badge>}
            {university.requirements.sat && <Badge variant="outline">SAT {university.requirements.sat}</Badge>}
            <Badge variant="outline">GPA {university.requirements.gpa}</Badge>
          </div>
        </div>

        <div>
          <span className="font-medium text-sm">Популярные программы:</span>
          <div className="flex flex-wrap gap-1 mt-2">
            {university.programs.slice(0, 3).map((program) => (
              <Badge key={program} variant="secondary" className="text-xs">
                {program}
              </Badge>
            ))}
            {university.programs.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{university.programs.length - 3}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-1" />
            {university.studentCount.toLocaleString()} студентов
          </div>
          <Button onClick={() => onViewDetails(university)} variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            Подробнее
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
