"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import {
  INTERESTS,
  PROFILES,
  PROJECT_STAGES,
  PROJECT_TIMINGS,
  PROJECT_TYPES,
  TEST_QUESTIONS,
  ANSWER_OPTIONS,
} from "@/lib/constants";

type Step = "form" | "test";

export default function DiagnosticoPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [leadId, setLeadId] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    whatsapp: "",
    company: "",
    role: "",
    city: "",
    profile: "",
    projectType: "",
    projectStage: "",
    projectTiming: "",
    interests: [] as string[],
  });

  const updateForm = (field: string, value: string | string[]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Error al registrar datos");
        return;
      }

      setLeadId(data.lead.id);
      setStep("test");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Error de conexión. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (answer: string) => {
    const question = TEST_QUESTIONS[currentQuestion];
    const newAnswers = { ...answers, [question.key]: answer };
    setAnswers(newAnswers);

    if (currentQuestion < TEST_QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      submitTest(newAnswers);
    }
  };

  const submitTest = async (finalAnswers: Record<string, string>) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId,
          answers: Object.entries(finalAnswers).map(([questionKey, answer]) => ({
            questionKey,
            answer,
          })),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Error al guardar test");
        return;
      }

      router.push(`/resultado/${leadId}`);
    } catch {
      setError("Error de conexión. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const testProgress =
    step === "test"
      ? ((currentQuestion + (Object.keys(answers).length > currentQuestion ? 1 : 0)) /
          TEST_QUESTIONS.length) *
        100
      : 0;

  return (
    <>
      <SiteHeader />
      <main className="flex-1 hero-glow">
        <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
          {step === "form" ? (
            <>
              <div className="text-center mb-8">
                <p className="text-electric text-sm uppercase tracking-widest mb-2">
                  Diagnóstico gratuito
                </p>
                <h1 className="text-2xl sm:text-3xl font-bold">
                  Contanos sobre tu proyecto
                </h1>
                <p className="text-muted text-sm mt-2">
                  Solo te tomará 1 minuto. Después hacés el test tecnológico.
                </p>
              </div>

              <form
                onSubmit={handleFormSubmit}
                className="glass-card rounded-2xl p-6 sm:p-8 space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Nombre *"
                    name="firstName"
                    value={form.firstName}
                    onChange={(e) => updateForm("firstName", e.target.value)}
                    required
                  />
                  <Input
                    label="Apellido *"
                    name="lastName"
                    value={form.lastName}
                    onChange={(e) => updateForm("lastName", e.target.value)}
                    required
                  />
                </div>
                <Input
                  label="Email *"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => updateForm("email", e.target.value)}
                  required
                />
                <Input
                  label="WhatsApp"
                  name="whatsapp"
                  type="tel"
                  placeholder="+54 9 ..."
                  value={form.whatsapp}
                  onChange={(e) => updateForm("whatsapp", e.target.value)}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Empresa"
                    name="company"
                    value={form.company}
                    onChange={(e) => updateForm("company", e.target.value)}
                  />
                  <Input
                    label="Cargo"
                    name="role"
                    value={form.role}
                    onChange={(e) => updateForm("role", e.target.value)}
                  />
                </div>
                <Input
                  label="Ciudad"
                  name="city"
                  value={form.city}
                  onChange={(e) => updateForm("city", e.target.value)}
                />
                <Select
                  label="Perfil *"
                  name="profile"
                  options={PROFILES}
                  placeholder="Seleccioná tu perfil"
                  value={form.profile}
                  onChange={(e) => updateForm("profile", e.target.value)}
                  required
                />
                <Select
                  label="Tipo de proyecto *"
                  name="projectType"
                  options={PROJECT_TYPES}
                  placeholder="Seleccioná el tipo"
                  value={form.projectType}
                  onChange={(e) => updateForm("projectType", e.target.value)}
                  required
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    label="Etapa *"
                    name="projectStage"
                    options={PROJECT_STAGES}
                    placeholder="Etapa actual"
                    value={form.projectStage}
                    onChange={(e) => updateForm("projectStage", e.target.value)}
                    required
                  />
                  <Select
                    label="Tiempo de obra *"
                    name="projectTiming"
                    options={PROJECT_TIMINGS}
                    placeholder="Cuándo empieza"
                    value={form.projectTiming}
                    onChange={(e) => updateForm("projectTiming", e.target.value)}
                    required
                  />
                </div>
                <CheckboxGroup
                  label="Intereses (opcional)"
                  options={INTERESTS}
                  values={form.interests}
                  onChange={(values) => updateForm("interests", values)}
                />

                {error && <p className="text-sm text-warning">{error}</p>}

                <Button type="submit" fullWidth size="lg" loading={loading}>
                  Continuar al test →
                </Button>
              </form>
            </>
          ) : (
            <>
              <div className="text-center mb-6">
                <p className="text-electric text-sm mb-2">
                  Pregunta {currentQuestion + 1} de {TEST_QUESTIONS.length}
                </p>
                <ProgressBar value={testProgress} showPercentage={false} />
              </div>

              <div className="glass-card rounded-2xl p-6 sm:p-10 text-center">
                <h2 className="text-xl sm:text-2xl font-semibold mb-8">
                  {TEST_QUESTIONS[currentQuestion].text}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {ANSWER_OPTIONS.map((option) => (
                    <Button
                      key={option}
                      variant={option === "Sí" ? "primary" : "secondary"}
                      size="lg"
                      fullWidth
                      onClick={() => handleAnswer(option)}
                      disabled={loading}
                    >
                      {option}
                    </Button>
                  ))}
                </div>

                {error && <p className="text-sm text-warning mt-4">{error}</p>}
                {loading && (
                  <p className="text-sm text-muted mt-4">Calculando resultado...</p>
                )}
              </div>
            </>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
