"use client"

import { useState, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { countries, programs, languages } from "@/lib/universities-data"
import { Search, Sparkles } from "lucide-react"

export interface SearchFilters {
  country: string
  program: string
  language: string
  budgetMin: number
  budgetMax: number
  ielts: number
  toefl: number
  sat: number
  act: number
  gpa: number
  competitiveness: number[]
}

interface UniversitySearchFormProps {
  onSearch: (filters: SearchFilters) => void
}

export function UniversitySearchForm({ onSearch }: UniversitySearchFormProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    country: "",
    program: "",
    language: "",
    budgetMin: 0,
    budgetMax: 100000,
    ielts: 0,
    toefl: 0,
    sat: 0,
    act: 0,
    gpa: 0,
    competitiveness: [1, 10],
  })

  const handleCountryChange = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, country: value }))
  }, [])

  const handleProgramChange = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, program: value }))
  }, [])

  const handleLanguageChange = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, language: value }))
  }, [])

  const handleCompetitivenessChange = useCallback((value: number[]) => {
    setFilters((prev) => ({ ...prev, competitiveness: value }))
  }, [])

  const handleSearch = useCallback(() => {
    onSearch(filters)
  }, [filters, onSearch])

  const countryOptions = useMemo(
    () =>
      countries.map((country) => (
        <SelectItem key={country} value={country}>
          {country}
        </SelectItem>
      )),
    [],
  )

  const programOptions = useMemo(
    () =>
      programs.map((program) => (
        <SelectItem key={program} value={program}>
          {program}
        </SelectItem>
      )),
    [],
  )

  const languageOptions = useMemo(
    () =>
      languages.map((language) => (
        <SelectItem key={language} value={language}>
          {language}
        </SelectItem>
      )),
    [],
  )

  return (
    <Card className="w-full max-w-5xl mx-auto gradient-card border-0 shadow-xl hover-lift">
      <CardHeader className="text-center pb-8">
        <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4 mx-auto">
          <Sparkles className="h-4 w-4" />
          Умный поиск университетов
        </div>
        <CardTitle className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Найдите свой идеальный университет
        </CardTitle>
        <p className="text-muted-foreground mt-4 text-lg leading-relaxed max-w-2xl mx-auto">
          Заполните только те поля, которые важны для вас. Остальные фильтры можно оставить пустыми.
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Основные критерии */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <Label htmlFor="country" className="text-sm font-semibold">
              Страна (необязательно)
            </Label>
            <Select value={filters.country} onValueChange={handleCountryChange}>
              <SelectTrigger className="h-12 min-h-[48px]">
                <SelectValue placeholder="Любая страна" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px]" position="popper" sideOffset={4}>
                {countryOptions}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="program" className="text-sm font-semibold">
              Программа обучения (необязательно)
            </Label>
            <Select value={filters.program} onValueChange={handleProgramChange}>
              <SelectTrigger className="h-12 min-h-[48px]">
                <SelectValue placeholder="Любая программа" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px]" position="popper" sideOffset={4}>
                {programOptions}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label htmlFor="language" className="text-sm font-semibold">
              Язык обучения (необязательно)
            </Label>
            <Select value={filters.language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="h-12 min-h-[48px]">
                <SelectValue placeholder="Любой язык" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px]" position="popper" sideOffset={4}>
                {languageOptions}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Бюджет */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Бюджет (USD в год)</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="budgetMin" className="text-sm font-medium">
                Минимум
              </Label>
              <Input
                id="budgetMin"
                type="number"
                className="h-12"
                value={filters.budgetMin}
                onChange={(e) => setFilters({ ...filters, budgetMin: Number.parseInt(e.target.value) || 0 })}
                placeholder="0"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="budgetMax" className="text-sm font-medium">
                Максимум
              </Label>
              <Input
                id="budgetMax"
                type="number"
                className="h-12"
                value={filters.budgetMax}
                onChange={(e) => setFilters({ ...filters, budgetMax: Number.parseInt(e.target.value) || 100000 })}
                placeholder="100000"
              />
            </div>
          </div>
        </div>

        {/* Тестовые баллы */}
        <div className="space-y-6">
          <div>
            <Label className="text-lg font-semibold">Ваши тестовые баллы</Label>
            <p className="text-sm text-muted-foreground mt-1">
              Укажите только те баллы, которые у вас есть. Остальные оставьте пустыми.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <Label htmlFor="ielts" className="text-sm font-medium">
                IELTS (необязательно)
              </Label>
              <Input
                id="ielts"
                type="number"
                step="0.5"
                min="0"
                max="9"
                className="h-12"
                value={filters.ielts || ""}
                onChange={(e) => setFilters({ ...filters, ielts: Number.parseFloat(e.target.value) || 0 })}
                placeholder="Не указан"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="toefl" className="text-sm font-medium">
                TOEFL (необязательно)
              </Label>
              <Input
                id="toefl"
                type="number"
                min="0"
                max="120"
                className="h-12"
                value={filters.toefl || ""}
                onChange={(e) => setFilters({ ...filters, toefl: Number.parseInt(e.target.value) || 0 })}
                placeholder="Не указан"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="sat" className="text-sm font-medium">
                SAT (необязательно)
              </Label>
              <Input
                id="sat"
                type="number"
                min="400"
                max="1600"
                className="h-12"
                value={filters.sat || ""}
                onChange={(e) => setFilters({ ...filters, sat: Number.parseInt(e.target.value) || 0 })}
                placeholder="Не указан"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="act" className="text-sm font-medium">
                ACT (необязательно)
              </Label>
              <Input
                id="act"
                type="number"
                min="1"
                max="36"
                className="h-12"
                value={filters.act || ""}
                onChange={(e) => setFilters({ ...filters, act: Number.parseInt(e.target.value) || 0 })}
                placeholder="Не указан"
              />
            </div>
          </div>
        </div>

        {/* GPA */}
        <div className="space-y-3">
          <Label htmlFor="gpa" className="text-sm font-semibold">
            Ваш GPA (необязательно)
          </Label>
          <Input
            id="gpa"
            type="number"
            step="0.1"
            min="0"
            max="4.0"
            className="h-12 max-w-xs"
            value={filters.gpa || ""}
            onChange={(e) => setFilters({ ...filters, gpa: Number.parseFloat(e.target.value) || 0 })}
            placeholder="Не указан"
          />
        </div>

        {/* Конкурентность */}
        <div className="space-y-6">
          <Label className="text-lg font-semibold">Уровень конкурентности</Label>
          <div className="px-6 py-4 bg-muted/30 rounded-xl">
            <div className="min-h-[24px]">
              <Slider
                value={filters.competitiveness}
                onValueChange={handleCompetitivenessChange}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground mt-4">
              <span>Низкий ({filters.competitiveness[0]})</span>
              <span>Высокий ({filters.competitiveness[1]})</span>
            </div>
          </div>
        </div>

        {/* Кнопка поиска */}
        <Button onClick={handleSearch} className="w-full h-14 text-lg font-semibold hover-lift" size="lg">
          <Search className="mr-3 h-6 w-6" />
          Найти университеты
        </Button>
      </CardContent>
    </Card>
  )
}
