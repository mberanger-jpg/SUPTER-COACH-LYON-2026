/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  MessageSquare, 
  Search, 
  CheckCircle2, 
  ExternalLink, 
  ChevronRight, 
  User, 
  FileText, 
  Camera, 
  Phone, 
  Mail, 
  MapPin, 
  Award,
  BookOpen,
  Target,
  Users,
  Building2,
  TrendingUp,
  ShieldCheck,
  CheckSquare,
  Lock,
  Unlock,
  ArrowRight,
  RefreshCw,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- DATA CONSTANTS ---


const CONTACTS = [
  { name: "Emma CHANFRAY", phone: "07 60 88 87 79" },
  { name: "Stella MALLET-MAISONETTE", phone: "07 60 84 25 40" },
  { name: "Mathieu BERANGER", phone: "06 61 10 35 64" },
  { name: "Email", value: "relations-entreprises-lyon@suptertiaire.com" }
];

const JOB_KEYWORDS = {
  immobilier: [
    "Gestion locative", "Transaction immobilière", "Copropriété", "Syndic", 
    "Promotion immobilière", "Asset Management", "Property Management", 
    "Négociateur immobilier", "Expertise immobilière", "Droit de l'immobilier", 
    "VEFA", "Bail commercial", "Prospection foncière", "Mandat de vente"
  ],
  finance: [
    "Analyse financière", "Contrôle de gestion", "Audit", "Comptabilité", 
    "Gestion de patrimoine", "Banque de détail", "Compliance", "Risk Management", 
    "Fiscalité", "Reporting financier", "Trésorerie", "Investissement", 
    "Consolidation", "M&A"
  ]
};

const ACCOMPAGNEMENT_STEPS = [
  {
    id: 'outils',
    title: "Étape 1: Vos Outils",
    icon: <FileText className="w-6 h-6" />,
    tips: [
      {
        title: "Le CV (Votre vitrine)",
        content: "Un CV doit être sur une seule page, au format PDF.",
        details: [
          "Indiquez impérativement votre Âge, Permis B/Véhicule et votre rythme d'alternance (ex: 3 sem./1 sem.).",
          "Le titre doit être clair : 'Alternant [Métier Visé]'.",
          "Mettez en avant vos compétences techniques (logiciels) et vos soft skills.",
          "Utilisez des verbes d'action pour décrire vos expériences passées."
        ]
      },
      {
        title: "La Lettre de Motivation",
        content: "Utilisez la structure VOUS / MOI / NOUS.",
        details: [
          "VOUS : Montrez que vous connaissez l'entreprise et ses enjeux.",
          "MOI : Expliquez ce que vous pouvez apporter grâce à votre parcours.",
          "NOUS : Projetez-vous dans une collaboration future réussie.",
          "Personnalisez chaque lettre : évitez absolument les copier-coller génériques."
        ]
      },
      {
        title: "Profil LinkedIn",
        content: "Votre photo doit être professionnelle.",
        details: [
          "Photo : Fond neutre, tenue pro, sourire avenant.",
          "Bannière : Utilisez un visuel en lien avec votre secteur (Immobilier, Finance).",
          "Titre : Mentionnez clairement votre recherche d'alternance et la date de disponibilité.",
          "Détaillez vos expériences et demandez des recommandations à vos anciens tuteurs."
        ]
      }
    ]
  },
  {
    id: 'strategie',
    title: "Étape 2: Stratégie de Recherche",
    icon: <Target className="w-6 h-6" />,
    tips: [
      {
        title: "Le Marché Caché",
        content: "70% des offres ne sont pas publiées.",
        details: [
          "Utilisez la candidature spontanée : ciblez les entreprises qui ne recrutent pas 'officiellement'.",
          "Déplacez-vous : dans l'immobilier, le contact direct en agence est très apprécié.",
          "Utilisez 'La Bonne Alternance' pour identifier les entreprises qui recrutent régulièrement.",
          "Ne négligez pas les petites structures (TPE/PME) souvent plus accessibles."
        ]
      },
      {
        title: "Le Réseau",
        content: "Parlez de votre recherche à votre entourage.",
        details: [
          "Anciens maîtres de stage : recontactez-les pour les informer de votre nouvelle étape.",
          "LinkedIn : Engagez-vous sur les posts des recruteurs de votre secteur.",
          "Alumni : Contactez les anciens de SUPTERTIAIRE déjà en poste.",
          "Le réseau est le premier vecteur de recrutement en alternance."
        ]
      },
      {
        title: "Prospection Active",
        content: "Ne vous contentez pas de répondre aux offres.",
        details: [
          "Identifiez 10 entreprises cibles par semaine.",
          "Contactez les décideurs : Responsable d'agence, RH, Dirigeant.",
          "Préparez un script d'appel court et percutant pour vos relances téléphoniques.",
          "Soyez organisé : notez chaque interaction dans votre tableau de suivi."
        ]
      }
    ]
  },
  {
    id: 'organisation',
    title: "Étape 3: Organisation",
    icon: <CheckSquare className="w-6 h-6" />,
    tips: [
      {
        title: "Tableau de Bord",
        content: "Suivez chaque candidature rigoureusement.",
        details: [
          "Colonnes indispensables : Date, Entreprise, Contact, Statut, Relance prévue.",
          "Utilisez Excel, Notion ou un carnet dédié, mais soyez systématique.",
          "Sans suivi, vous risquez de bafouiller si un recruteur vous appelle par surprise.",
          "Notez aussi les refus pour analyser les raisons et vous améliorer."
        ]
      },
      {
        title: "La Relance",
        content: "Relancez systématiquement 7 à 10 jours après.",
        details: [
          "La relance montre votre motivation et votre ténacité.",
          "Privilégiez le téléphone pour un contact plus humain et direct.",
          "Si vous n'arrivez pas à joindre le décideur, demandez quand il est préférable de rappeler.",
          "C'est souvent à la relance que l'entretien se décroche !"
        ]
      },
      {
        title: "Persévérance",
        content: "La recherche d'alternance est un marathon.",
        details: [
          "Fixez-vous des objectifs quotidiens (ex: 5 candidatures par jour).",
          "Gardez un rythme de travail 'bureau' : 9h-12h / 14h-17h.",
          "Célébrez les petites victoires (un entretien décroché, une réponse positive).",
          "L'équipe Relations Entreprises est là pour vous soutenir en cas de baisse de moral."
        ]
      }
    ]
  }
];

const INTERVIEW_METHODOLOGY = [
  {
    title: "1. En amont : La Préparation",
    icon: <Search className="w-5 h-5" />,
    points: [
      "Étudiez l'entreprise : son histoire, ses chiffres clés, ses valeurs.",
      "Analysez l'offre : identifiez les compétences clés attendues.",
      "Préparez votre 'Pitch' : présentez votre parcours en 2 minutes de façon percutante.",
      "Anticipez les questions classiques : 'Pourquoi vous ?', 'Vos qualités/défauts', 'Pourquoi l'Immobilier/Finance ?'."
    ]
  },
  {
    title: "2. Pendant : La Posture",
    icon: <User className="w-5 h-5" />,
    points: [
      "Tenue professionnelle irréprochable (Costume/Tailleur conseillé).",
      "Écoute active : prenez des notes, posez des questions pertinentes.",
      "Communication non-verbale : tenez-vous droit, souriez, maintenez le contact visuel.",
      "Démontrez votre curiosité : interrogez sur l'équipe, les outils, les objectifs."
    ]
  },
  {
    title: "3. Après : Le Suivi",
    icon: <Mail className="w-5 h-5" />,
    points: [
      "Envoyez un mail de remerciement dans les 24h (réitérez votre motivation).",
      "Analysez votre prestation : qu'est-ce qui a bien marché ? Qu'est-ce qui est à améliorer ?",
      "Restez professionnel même en cas de refus : demandez un feedback constructif."
    ]
  },
  {
    title: "Accompagnement Personnalisé SUPTERTIAIRE",
    icon: <Star className="w-5 h-5" />,
    isSpecial: true,
    points: [
      "Vous avez décroché un entretien ? Bravo !",
      "Pour obtenir une préparation personnalisée avec l'équipe Relations Entreprises :",
      "1. Envoyez votre CV à jour.",
      "2. Joignez l'offre de poste concernée.",
      "Contactez-nous par mail pour fixer un rendez-vous de coaching."
    ]
  }
];

const JOBBOARDS = [
  { 
    name: "La Bonne Alternance", 
    url: "https://labonnealternance.apprentissage.beta.gouv.fr/", 
    color: "bg-orange-500", 
    desc: "Lien prioritaire pour les contrats d'apprentissage.",
    immoTip: "Filtrez par 'Immobilier' et votre ville.",
    financeTip: "Cherchez 'Banque' ou 'Assurance'."
  },
  { 
    name: "LinkedIn", 
    url: "https://www.linkedin.com/jobs/emplois-dans-lyon/?currentJobId=4374375051&originalSubdomain=fr", 
    color: "bg-blue-700", 
    desc: "Incontournable pour le réseau et les offres directes.",
    immoTip: "Suivez les agences locales et les promoteurs.",
    financeTip: "Activez les alertes pour les grands groupes bancaires."
  },
  { 
    name: "Indeed", 
    url: "https://fr.indeed.com/", 
    color: "bg-blue-500", 
    desc: "Le plus gros volume d'offres.",
    immoTip: "Utilisez 'Négociateur' ou 'Copropriété'.",
    financeTip: "Mots-clés : 'Analyse financière', 'Clientèle'."
  },
  { 
    name: "Welcome to the Jungle", 
    url: "https://www.welcometothejungle.com/", 
    color: "bg-yellow-500", 
    desc: "Pour les entreprises à forte culture RH.",
    immoTip: "Idéal pour les PropTechs.",
    financeTip: "Cherchez les FinTechs en pleine croissance."
  },
  { 
    name: "HelloWork", 
    url: "https://www.hellowork.com/", 
    color: "bg-purple-600", 
    desc: "Très efficace pour le ciblage régional.",
    immoTip: "Excellent pour les métiers de la gestion.",
    financeTip: "Offres souvent très détaillées."
  }
];

// --- COMPONENTS ---

export default function App() {
  const [activeTab, setActiveTab] = useState<'accompagnement' | 'entretien' | 'contact'>('accompagnement');
  const [expandedTip, setExpandedTip] = useState<string | null>(null);
  const [checklist, setChecklist] = useState({
    cv: false,
    lm: false,
    posture: false,
    research: false
  });
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleTabChange = (tab: 'accompagnement' | 'entretien' | 'contact') => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const allChecked = Object.values(checklist).every(v => v);
    setIsUnlocked(allChecked);
  }, [checklist]);

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-[#002147] font-sans">
      {/* Header */}
      <header className="bg-[#002147] text-white py-6 px-4 shadow-lg sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#FF8C00] p-2 rounded-lg">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">SUPTER'COACH LYON</h1>
              <p className="text-xs text-orange-200 uppercase tracking-widest font-semibold">By SUPTERTIAIRE</p>
            </div>
          </div>
          <div className="hidden sm:flex gap-4 text-sm font-medium">
            <button onClick={() => handleTabChange('accompagnement')} className={cn("hover:text-orange-400 transition", activeTab === 'accompagnement' && "text-orange-400 underline underline-offset-8")}>Accompagnement & Recherche</button>
            <button onClick={() => handleTabChange('entretien')} className={cn("hover:text-orange-400 transition", activeTab === 'entretien' && "text-orange-400 underline underline-offset-8")}>Entretien</button>
            <button onClick={() => handleTabChange('contact')} className={cn("hover:text-orange-400 transition", activeTab === 'contact' && "text-orange-400 underline underline-offset-8")}>Contact</button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 pb-24">
        <AnimatePresence mode="wait">
          {/* MODULE ACCOMPAGNEMENT & RECHERCHE */}
          {activeTab === 'accompagnement' && (
            <motion.div 
              key="accompagnement"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Methodology Section */}
              <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-6">
                  <BookOpen className="w-6 h-6 text-[#FF8C00]" />
                  <h2 className="text-xl font-bold">Méthodologie d'Accompagnement</h2>
                </div>

                <div className="space-y-6">
                  {ACCOMPAGNEMENT_STEPS.map((step) => (
                    <div key={step.id} className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-[#002147] p-2 rounded-lg text-white">
                          {step.icon}
                        </div>
                        <h3 className="font-bold text-lg">{step.title}</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {step.tips.map((tip, i) => {
                          const tipId = `${step.id}-${i}`;
                          const isExpanded = expandedTip === tipId;
                          return (
                            <div 
                              key={i} 
                              className={cn(
                                "bg-white p-4 rounded-xl shadow-sm border border-gray-50 cursor-pointer transition-all duration-300",
                                isExpanded ? "ring-2 ring-orange-400 shadow-md" : "hover:border-orange-200"
                              )}
                              onClick={() => setExpandedTip(isExpanded ? null : tipId)}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-bold text-sm text-[#FF8C00]">{tip.title}</h4>
                                <ChevronRight className={cn("w-4 h-4 text-gray-400 transition-transform", isExpanded && "rotate-90 text-orange-400")} />
                              </div>
                              <p className="text-xs text-gray-600 leading-relaxed">{tip.content}</p>
                              
                              <AnimatePresence>
                                {isExpanded && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="mt-4 pt-4 border-t border-gray-100 space-y-3 bg-orange-50/30 -mx-4 px-4 pb-4 rounded-b-xl">
                                      {tip.details.map((detail, idx) => (
                                        <div key={idx} className="flex gap-3 items-start">
                                          <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0 shadow-sm" />
                                          <p className="text-xs text-gray-700 leading-relaxed font-medium">{detail}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Checklist Section */}
              <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <CheckSquare className="w-6 h-6 text-[#FF8C00]" />
                  Ma candidature est-elle prête ?
                </h2>
                <p className="text-sm text-gray-500 mb-6 italic">Cochez les étapes validées pour débloquer l'accès aux Jobboards.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'cv', label: 'CV optimisé (1 page, PDF)', icon: <FileText /> },
                    { id: 'lm', label: 'Lettre de motivation personnalisée', icon: <Mail /> },
                    { id: 'posture', label: 'Posture & Discours préparés', icon: <User /> },
                    { id: 'research', label: 'Stratégie de recherche définie', icon: <Target /> }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => toggleCheck(item.id as keyof typeof checklist)}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-xl border transition-all",
                        checklist[item.id as keyof typeof checklist] 
                          ? "bg-green-50 border-green-200 text-green-700" 
                          : "bg-gray-50 border-gray-100 text-gray-600"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className={cn(checklist[item.id as keyof typeof checklist] ? "text-green-500" : "text-gray-400")}>
                          {item.icon}
                        </span>
                        <span className="text-sm font-semibold">{item.label}</span>
                      </div>
                      {checklist[item.id as keyof typeof checklist] ? <CheckCircle2 className="w-5 h-5" /> : <div className="w-5 h-5 rounded-full border-2 border-gray-200" />}
                    </button>
                  ))}
                </div>
              </section>

              {/* SECTION MOTS-CLÉS */}
              <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-8">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Search className="w-6 h-6 text-[#FF8C00]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#002147]">Mots-clés Stratégiques</h2>
                    <p className="text-sm text-gray-500">Optimisez votre CV et vos alertes sur les jobboards</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Immobilier */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                      <Building2 className="w-5 h-5 text-[#002147]" />
                      <h3 className="font-bold text-[#002147]">Secteur Immobilier</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {JOB_KEYWORDS.immobilier.map((kw, idx) => (
                        <span 
                          key={idx} 
                          className="px-3 py-1.5 bg-blue-50 text-[#002147] text-xs font-semibold rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors cursor-default"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Finance */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                      <TrendingUp className="w-5 h-5 text-[#FF8C00]" />
                      <h3 className="font-bold text-[#002147]">Secteur Finance</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {JOB_KEYWORDS.finance.map((kw, idx) => (
                        <span 
                          key={idx} 
                          className="px-3 py-1.5 bg-orange-50 text-orange-700 text-xs font-semibold rounded-lg border border-orange-100 hover:bg-orange-100 transition-colors cursor-default"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                  <p className="text-xs text-gray-600 text-center leading-relaxed">
                    <span className="font-bold text-[#FF8C00]">Conseil SUP'COACH :</span> Intégrez ces termes dans votre section "Compétences" et dans le titre de votre profil LinkedIn. Les algorithmes des jobboards (Indeed, LinkedIn) utilisent ces mots-clés pour faire remonter votre profil auprès des recruteurs.
                  </p>
                </div>
              </section>

              {/* Jobboards Hub */}
              <section className="relative">
                {!isUnlocked && (
                  <div className="absolute inset-0 z-10 bg-white/60 backdrop-blur-[2px] rounded-2xl flex flex-col items-center justify-center text-center p-6">
                    <div className="bg-[#002147] p-4 rounded-full mb-4 shadow-xl">
                      <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Accès Verrouillé</h3>
                    <p className="text-sm text-gray-600 max-w-xs">Complétez la checklist ci-dessus pour accéder aux liens directs vers les Jobboards.</p>
                  </div>
                )}

                <div className={cn("space-y-4 transition-all duration-500", !isUnlocked && "opacity-30 pointer-events-none")}>
                  <div className="flex items-center gap-2 mb-4">
                    <Search className="w-6 h-6 text-[#FF8C00]" />
                    <h2 className="text-xl font-bold">Jobboards & Recherche</h2>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {JOBBOARDS.map((jb, i) => (
                      <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition group">
                        <div className="flex items-center gap-4">
                          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-inner", jb.color)}>
                            <Briefcase className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="font-bold text-[#002147]">{jb.name}</h3>
                            <p className="text-xs text-gray-500">{jb.desc}</p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 sm:items-end">
                          <a href={jb.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-2 bg-[#002147] text-white rounded-xl text-sm font-bold hover:bg-[#FF8C00] transition-colors">
                            Postuler <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* MÉTHODE D'ENTRETIEN */}
          {activeTab === 'entretien' && (
            <motion.div 
              key="entretien"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-8">
                  <MessageSquare className="w-6 h-6 text-[#FF8C00]" />
                  <h2 className="text-xl font-bold">Préparer son Entretien</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {INTERVIEW_METHODOLOGY.map((section, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "p-6 rounded-2xl border transition-all",
                        section.isSpecial 
                          ? "bg-[#002147] text-white border-orange-400 shadow-xl ring-1 ring-orange-400/50 md:col-span-2" 
                          : "bg-gray-50 border-gray-100"
                      )}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className={cn(
                          "p-2 rounded-lg",
                          section.isSpecial ? "bg-orange-500 text-white" : "bg-[#002147] text-white"
                        )}>
                          {section.icon}
                        </div>
                        <h3 className="font-bold text-lg">{section.title}</h3>
                      </div>
                      <div className="space-y-3">
                        {section.points.map((point, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className={cn(
                              "w-1.5 h-1.5 rounded-full mt-2 shrink-0",
                              section.isSpecial ? "bg-orange-400" : "bg-[#FF8C00]"
                            )} />
                            <p className={cn(
                              "text-sm leading-relaxed",
                              section.isSpecial ? "text-gray-200" : "text-gray-600"
                            )}>{point}</p>
                          </div>
                        ))}
                      </div>
                      {section.isSpecial && (
                        <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4 items-center justify-between">
                          <p className="text-xs text-orange-200 italic">Préparez votre avenir avec l'expertise SUPTERTIAIRE.</p>
                          <button 
                            onClick={() => setActiveTab('contact')}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-bold text-sm transition-colors flex items-center gap-2"
                          >
                            Prendre RDV Coaching <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {/* ONGLET CONTACT */}
          {activeTab === 'contact' && (
            <motion.div 
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-8">
                  <Users className="w-6 h-6 text-[#FF8C00]" />
                  <h2 className="text-xl font-bold">L'Équipe Relations Entreprises</h2>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {CONTACTS.map((contact, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="bg-[#002147] p-3 rounded-full text-white">
                        {contact.name === "Email" ? <Mail className="w-5 h-5" /> : <User className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="font-bold text-[#002147]">{contact.name}</p>
                        <p className="text-sm text-gray-600 font-mono">{contact.phone || contact.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-4 bg-orange-50 border border-orange-100 rounded-xl text-center">
                  <p className="text-sm text-orange-800 font-medium">L'équipe est à votre écoute pour vous accompagner dans votre recherche d'alternance.</p>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Mobile Navigation */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex justify-between items-center shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50">
        {[
          { id: 'accompagnement', icon: <BookOpen />, label: 'Accompagnement' },
          { id: 'entretien', icon: <MessageSquare />, label: 'Entretien' },
          { id: 'contact', icon: <Users />, label: 'Contact' }
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => handleTabChange(tab.id as any)}
            className={cn("flex flex-col items-center gap-1 transition flex-1", activeTab === tab.id ? "text-[#FF8C00]" : "text-gray-400")}
          >
            {React.cloneElement(tab.icon as React.ReactElement, { className: "w-6 h-6" })}
            <span className="text-[10px] font-bold">{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer Info */}
      <footer className="max-w-4xl mx-auto p-8 text-center text-gray-400 text-xs pb-24 sm:pb-8">
        <p>© 2026 SUPTER'COACH LYON - Outil d'accompagnement SUPTERTIAIRE</p>
      </footer>
    </div>
  );
}
