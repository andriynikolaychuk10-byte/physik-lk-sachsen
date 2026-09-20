(() => {
  let extensionIndex = 0;
  const f = (name, latex, category, description, variables, application, tags) => ({
    id: `extended-${extensionIndex}`,
    sourceId: `extended-${extensionIndex++}`,
    name,
    latex,
    category,
    description,
    variables,
    application,
    tags: tags.split(',').map((x) => x.trim()),
    type: category,
    created: Date.now() - seed.length,
    used: 0,
    example: '',
  });
  const more = [
    f(
      'Momentangeschwindigkeit',
      'v=\\frac{ds}{dt}',
      'Kinematik',
      'Änderungsrate des Ortes zum Zeitpunkt t.',
      'v [m/s]; s [m]; t [s]',
      'Beliebige eindimensionale Bewegung.',
      'Differentialrechnung, Geschwindigkeit',
    ),
    f(
      'Momentanbeschleunigung',
      'a=\\frac{dv}{dt}=\\frac{d^2s}{dt^2}',
      'Kinematik',
      'Änderungsrate der Geschwindigkeit.',
      'a [m/s²]; v [m/s]; s [m]; t [s]',
      'Beliebige eindimensionale Bewegung.',
      'Differentialrechnung, Beschleunigung',
    ),
    f(
      'Weg aus Geschwindigkeit',
      's-s_0=\\int_{t_0}^{t}v(t)\\,dt',
      'Kinematik',
      'Ortsänderung als Fläche unter dem v-t-Diagramm.',
      's,s₀ [m]; v [m/s]; t [s]',
      'Bei bekannter Geschwindigkeitsfunktion.',
      'Integral, Weg',
    ),
    f(
      'Geschwindigkeit aus Beschleunigung',
      'v-v_0=\\int_{t_0}^{t}a(t)\\,dt',
      'Kinematik',
      'Geschwindigkeitsänderung als Fläche unter dem a-t-Diagramm.',
      'v,v₀ [m/s]; a [m/s²]; t [s]',
      'Bei bekannter Beschleunigungsfunktion.',
      'Integral, Geschwindigkeit',
    ),
    f(
      'Winkelbeschleunigung',
      '\\alpha=\\frac{d\\omega}{dt}',
      'Kreisbewegung',
      'Änderungsrate der Winkelgeschwindigkeit.',
      'α [rad/s²]; ω [rad/s]; t [s]',
      'Drehbewegung um feste Achse.',
      'Rotation, Winkelbeschleunigung',
    ),
    f(
      'Winkelgeschwindigkeit bei konstanter α',
      '\\omega=\\omega_0+\\alpha t',
      'Kreisbewegung',
      'Winkelgeschwindigkeit bei gleichmäßiger Winkelbeschleunigung.',
      'ω,ω₀ [rad/s]; α [rad/s²]; t [s]',
      'Nur für konstante Winkelbeschleunigung.',
      'Rotation, Kinematik',
    ),
    f(
      'Winkel-Zeit-Gesetz',
      '\\varphi=\\varphi_0+\\omega_0t+\\frac12\\alpha t^2',
      'Kreisbewegung',
      'Winkelposition bei gleichmäßiger Winkelbeschleunigung.',
      'φ,φ₀ [rad]; ω₀ [rad/s]; α [rad/s²]; t [s]',
      'Nur für konstante α.',
      'Rotation, Winkel',
    ),
    f(
      'Drehmoment',
      'M=I\\alpha',
      'Kreisbewegung',
      'Drehmoment bewirkt Winkelbeschleunigung.',
      'M [N·m]; I [kg·m²]; α [rad/s²]',
      'Starres System um feste Achse.',
      'Drehbewegung, Drehmoment',
    ),
    f(
      'Rotationsarbeit',
      'W_{rot}=M\\Delta\\varphi',
      'Kreisbewegung',
      'Arbeit eines konstanten Drehmoments.',
      'W [J]; M [N·m]; Δφ [rad]',
      'Für konstantes Drehmoment.',
      'Rotation, Arbeit',
    ),
    f(
      'Rotationsleistung',
      'P_{rot}=M\\omega',
      'Kreisbewegung',
      'Leistung eines rotierenden Antriebs.',
      'P [W]; M [N·m]; ω [rad/s]',
      'Drehmoment und Winkelgeschwindigkeit parallel.',
      'Rotation, Leistung',
    ),
    f(
      'Drehimpuls',
      'L=I\\omega',
      'Kreisbewegung',
      'Drehimpuls eines starren Körpers.',
      'L [kg·m²/s]; I [kg·m²]; ω [rad/s]',
      'Drehung um feste Achse.',
      'Drehimpuls, Rotation',
    ),
    f(
      'Drehmoment und Drehimpuls',
      'M=\\frac{dL}{dt}',
      'Kreisbewegung',
      'Äußeres Drehmoment ist die Änderungsrate des Drehimpulses.',
      'M [N·m]; L [kg·m²/s]; t [s]',
      'Vektorform allgemein; hier Beträge bei fester Achse.',
      'Drehimpuls, Drehmoment',
    ),
    f(
      'Arbeit als Integral',
      'W=\\int\\vec F\\cdot d\\vec s',
      'Arbeit & Energie',
      'Allgemeine Arbeit entlang eines Weges.',
      'W [J]; F [N]; s [m]',
      'Für orts- oder richtungsabhängige Kräfte.',
      'Arbeit, Integral',
    ),
    f(
      'Arbeit-Energie-Satz',
      'W_{res}=\\Delta E_{kin}',
      'Arbeit & Energie',
      'Resultierende Arbeit ändert die kinetische Energie.',
      'W_res,E_kin [J]',
      'Für einen Massenpunkt im Inertialsystem.',
      'Arbeit, Energie',
    ),
    f(
      'Leistung als Ableitung',
      'P=\\frac{dW}{dt}',
      'Arbeit & Energie',
      'Momentane umgesetzte Arbeit pro Zeit.',
      'P [W]; W [J]; t [s]',
      'Allgemeine Definition.',
      'Leistung, Differentialrechnung',
    ),
    f(
      'Mechanische Leistung',
      'P=\\vec F\\cdot\\vec v',
      'Arbeit & Energie',
      'Leistung einer Kraft auf einen bewegten Körper.',
      'P [W]; F [N]; v [m/s]',
      'Momentanwert; Skalarprodukt beachten.',
      'Leistung, Kraft',
    ),
    f(
      'Hookesches Gesetz',
      'F=-Dx',
      'Dynamik',
      'Rückstellkraft einer idealen Feder.',
      'F [N]; D [N/m]; x [m]',
      'Für kleine Dehnungen; Minuszeichen zeigt zur Ruhelage.',
      'Feder, Kraft',
    ),
    f(
      'Kraft aus potentieller Energie',
      'F_x=-\\frac{dE_{pot}}{dx}',
      'Arbeit & Energie',
      'Konservative Kraft als negativer Energiegradient.',
      'F_x [N]; E_pot [J]; x [m]',
      'Eindimensionaler konservativer Fall.',
      'Potential, Kraft',
    ),
    f(
      'Hangabtriebskraft',
      'F_{\\parallel}=mg\\sin(\\alpha)',
      'Dynamik',
      'Gewichtskraft-Komponente entlang einer schiefen Ebene.',
      'F∥ [N]; m [kg]; g [m/s²]; α [°]',
      'Ohne weitere Kräfte; α gegen Horizontale.',
      'Schiefe Ebene, Kraft',
    ),
    f(
      'Normalkraft schiefe Ebene',
      'F_N=mg\\cos(\\alpha)',
      'Dynamik',
      'Senkrechte Gewichtskraft-Komponente an einer schiefen Ebene.',
      'F_N [N]; m [kg]; g [m/s²]; α [°]',
      'Ohne zusätzliche senkrechte Kräfte.',
      'Schiefe Ebene, Normalkraft',
    ),
    f(
      'Schwerpunkt',
      'x_S=\\frac{\\sum_i m_ix_i}{\\sum_i m_i}',
      'Dynamik',
      'Massenmittelpunkt diskreter Massen auf einer Achse.',
      'x_S,x_i [m]; m_i [kg]',
      'Für eine Koordinatenrichtung.',
      'Schwerpunkt, Masse',
    ),
    f(
      'Dichte',
      '\\rho=\\frac{m}{V}',
      'Dynamik',
      'Masse pro Volumen.',
      'ρ [kg/m³]; m [kg]; V [m³]',
      'Homogene Stoffe oder mittlere Dichte.',
      'Dichte, Volumen',
    ),
    f(
      'Druck',
      'p=\\frac{F}{A}',
      'Dynamik',
      'Normalkraft pro Fläche.',
      'p [Pa]; F [N]; A [m²]',
      'Kraft senkrecht und gleichmäßig verteilt.',
      'Druck, Fläche',
    ),
    f(
      'Hydrostatischer Druck',
      'p=p_0+\\rho gh',
      'Dynamik',
      'Druck in der Tiefe h einer ruhenden Flüssigkeit.',
      'p,p₀ [Pa]; ρ [kg/m³]; g [m/s²]; h [m]',
      'Inkompressible Flüssigkeit, konstantes g.',
      'Hydrostatik, Druck',
    ),
    f(
      'Auftriebskraft',
      'F_A=\\rho_{Fl}V_{verdr}g',
      'Dynamik',
      'Auftrieb entspricht dem Gewicht der verdrängten Flüssigkeit.',
      'F_A [N]; ρ_Fl [kg/m³]; V_verdr [m³]; g [m/s²]',
      'Archimedisches Prinzip in einem Fluid.',
      'Auftrieb, Hydrostatik',
    ),
    f(
      'Kraft als Impulsänderung',
      'F=\\frac{dp}{dt}',
      'Impuls & Stoß',
      'Resultierende Kraft ist die zeitliche Impulsänderung.',
      'F [N]; p [kg·m/s]; t [s]',
      'Allgemeine Newtonsche Form.',
      'Impuls, Kraft',
    ),
    f(
      'Kraftstoß',
      '\\Delta p=\\int F(t)\\,dt',
      'Impuls & Stoß',
      'Fläche unter dem Kraft-Zeit-Diagramm ist die Impulsänderung.',
      'Δp [kg·m/s]; F [N]; t [s]',
      'Für zeitabhängige Kräfte.',
      'Impuls, Integral',
    ),
    f(
      'Schwerpunktgeschwindigkeit',
      'v_S=\\frac{\\sum_i m_iv_i}{\\sum_i m_i}',
      'Impuls & Stoß',
      'Geschwindigkeit des Massenmittelpunkts.',
      'v_S,v_i [m/s]; m_i [kg]',
      'Eindimensionale diskrete Massen.',
      'Schwerpunkt, Impuls',
    ),
    f(
      'Stoßzahl',
      "e=\\frac{|v_2' -v_1'|}{|v_2-v_1|}",
      'Impuls & Stoß',
      'Verhältnis der Relativgeschwindigkeiten nach und vor dem Stoß.',
      'e [1]; v [m/s]',
      'Eindimensional entlang der Stoßlinie; e=1 elastisch, e=0 vollkommen unelastisch.',
      'Stoß, Elastizität',
    ),
    f(
      'Gravitationspotentialenergie',
      'E_{pot}=-\\frac{GMm}{r}',
      'Gravitation',
      'Potentielle Energie zweier Massen mit Nullpunkt bei unendlich.',
      'E_pot [J]; G [N·m²/kg²]; M,m [kg]; r [m]',
      'Punktmassen oder kugelsymmetrische Massen außerhalb.',
      'Gravitation, Potential',
    ),
    f(
      'Gravitationspotential',
      '\\phi=-\\frac{GM}{r}',
      'Gravitation',
      'Potentielle Energie pro Masse.',
      'φ [J/kg]; G [N·m²/kg²]; M [kg]; r [m]',
      'Nullpunkt bei unendlich.',
      'Gravitation, Potential',
    ),
    f(
      'Fluchtgeschwindigkeit',
      'v_{esc}=\\sqrt{\\frac{2GM}{r}}',
      'Gravitation',
      'Kleinste Anfangsgeschwindigkeit zum Entkommen bis unendlich.',
      'v_esc [m/s]; G [N·m²/kg²]; M [kg]; r [m]',
      'Ohne Luftwiderstand und weitere Körper.',
      'Gravitation, Flucht',
    ),
    f(
      'Keplers drittes Gesetz',
      '\\frac{T^2}{a^3}=\\frac{4\\pi^2}{G(M+m)}',
      'Gravitation',
      'Verbindung von Umlaufzeit und großer Halbachse.',
      'T [s]; a [m]; G [N·m²/kg²]; M,m [kg]',
      'Zwei-Körper-Problem; bei m≪M oft T²/a³≈4π²/(GM).',
      'Kepler, Orbit',
    ),
    f(
      'Feld einer Punktladung',
      'E=\\frac{1}{4\\pi\\varepsilon_0}\\frac{|Q|}{r^2}',
      'Elektrisches Feld',
      'Betrag der Feldstärke einer Punktladung.',
      'E [N/C]; Q [C]; r [m]; ε₀ [F/m]',
      'Punktladung im Vakuum.',
      'Feld, Punktladung',
    ),
    f(
      'Elektrisches Potential',
      'V=\\frac{W}{q}',
      'Elektrisches Feld',
      'Arbeit pro Ladung; Potential ist ortsbezogen.',
      'V [V]; W [J]; q [C]',
      'Vorzeichen der Ladung beachten.',
      'Potential, Spannung',
    ),
    f(
      'Potential einer Punktladung',
      'V=\\frac{1}{4\\pi\\varepsilon_0}\\frac{Q}{r}',
      'Elektrisches Feld',
      'Elektrisches Potential einer Punktladung mit Nullpunkt bei unendlich.',
      'V [V]; Q [C]; r [m]; ε₀ [F/m]',
      'Punktladung im Vakuum.',
      'Potential, Punktladung',
    ),
    f(
      'Elektrische Feldstärke aus Potential',
      'E_x=-\\frac{dV}{dx}',
      'Elektrisches Feld',
      'Feldkomponente ist der negative Potentialgradient.',
      'E_x [V/m]; V [V]; x [m]',
      'Eindimensional; allgemein gilt E⃗=−∇V.',
      'Feld, Potential',
    ),
    f(
      'Elektrische potentielle Energie',
      'E_{pot}=qV',
      'Elektrisches Feld',
      'Energie einer Ladung im Potential V.',
      'E_pot [J]; q [C]; V [V]',
      'Bezugsniveau des Potentials beachten.',
      'Potential, Energie',
    ),
    f(
      'Elektrischer Fluss',
      '\\Phi_E=EA\\cos(\\alpha)',
      'Elektrisches Feld',
      'Fluss durch eine ebene Fläche im homogenen Feld.',
      'Φ_E [N·m²/C]; E [N/C]; A [m²]; α [°]',
      'Für homogenes Feld und ebene Fläche.',
      'Fluss, Feld',
    ),
    f(
      'Gaußsches Gesetz',
      '\\oint\\vec E\\cdot d\\vec A=\\frac{Q_{ges}}{\\varepsilon_0}',
      'Elektrisches Feld',
      'Elektrischer Gesamtfluss einer geschlossenen Fläche.',
      'Φ_E [N·m²/C]; Q_ges [C]; ε₀ [F/m]',
      'Besonders nützlich bei hoher Symmetrie.',
      'Gauß, Feld',
    ),
    f(
      'Stromdichte',
      'j=\\frac{I}{A}',
      'Elektrizitätslehre',
      'Strom pro Querschnittsfläche.',
      'j [A/m²]; I [A]; A [m²]',
      'Gleichmäßig verteilter Strom.',
      'Strom, Dichte',
    ),
    f(
      'Widerstand eines Leiters',
      'R=\\rho\\frac{l}{A}',
      'Elektrizitätslehre',
      'Widerstand eines homogenen Leiters.',
      'R [Ω]; ρ [Ω·m]; l [m]; A [m²]',
      'Konstante Temperatur und homogener Leiter.',
      'Widerstand, Leitfähigkeit',
    ),
    f(
      'Elektrische Energie',
      'E_{el}=Pt',
      'Elektrizitätslehre',
      'Elektrisch umgesetzte Energie aus Leistung und Zeit.',
      'E_el [J]; P [W]; t [s]',
      'Bei konstanter Leistung.',
      'Energie, Leistung',
    ),
    f(
      'Plattenkondensator',
      'C=\\varepsilon_0\\varepsilon_r\\frac{A}{d}',
      'Elektrizitätslehre',
      'Kapazität eines idealen Plattenkondensators.',
      'C [F]; ε₀ [F/m]; ε_r [1]; A [m²]; d [m]',
      'Randeffekte vernachlässigt.',
      'Kondensator, Kapazität',
    ),
    f(
      'Kondensatorenergie über Ladung',
      'E_C=\\frac{Q^2}{2C}',
      'Elektrizitätslehre',
      'Gespeicherte Energie eines Kondensators.',
      'E_C [J]; Q [C]; C [F]',
      'Idealer Kondensator.',
      'Kondensator, Energie',
    ),
    f(
      'RC-Zeitkonstante',
      '\\tau=RC',
      'Elektrizitätslehre',
      'Charakteristische Zeit eines RC-Glieds.',
      'τ [s]; R [Ω]; C [F]',
      'Linearer Widerstand und idealer Kondensator.',
      'Kondensator, Zeitkonstante',
    ),
    f(
      'Kondensator-Aufladung',
      'U_C(t)=U_0(1-e^{-t/(RC)})',
      'Elektrizitätslehre',
      'Kondensatorspannung beim Laden.',
      'U_C,U₀ [V]; t,RC [s]',
      'Reihenschaltung aus R und C bei Spannungssprung.',
      'Kondensator, Aufladung',
    ),
    f(
      'Kondensator-Entladung',
      'U_C(t)=U_0e^{-t/(RC)}',
      'Elektrizitätslehre',
      'Kondensatorspannung beim Entladen.',
      'U_C,U₀ [V]; t,RC [s]',
      'Entladung über einen ohmschen Widerstand.',
      'Kondensator, Entladung',
    ),
    f(
      'Magnetfeld einer langen Spule',
      'B=\\mu_0nI',
      'Magnetismus',
      'Magnetische Flussdichte im Inneren einer langen Luftspule.',
      'B [T]; μ₀ [H/m]; n [1/m]; I [A]',
      'Lange Spule; Randfelder vernachlässigt.',
      'Magnetfeld, Spule',
    ),
    f(
      'Magnetischer Fluss',
      '\\Phi=BA\\cos(\\alpha)',
      'Magnetismus',
      'Magnetischer Fluss durch eine ebene Fläche.',
      'Φ [Wb]; B [T]; A [m²]; α [°]',
      'Homogenes Feld und ebene Fläche.',
      'Magnetismus, Fluss',
    ),
    f(
      'Faradaysches Induktionsgesetz',
      'U_{ind}=-N\\frac{d\\Phi}{dt}',
      'Magnetismus',
      'Induktionsspannung durch Flussänderung.',
      'U_ind [V]; N [1]; Φ [Wb]; t [s]',
      'Minuszeichen beschreibt die Lenzsche Regel.',
      'Induktion, Faraday',
    ),
    f(
      'Bewegter Leiter',
      'U_{ind}=Blv',
      'Magnetismus',
      'Induktionsspannung eines bewegten Leiters.',
      'U_ind [V]; B [T]; l [m]; v [m/s]',
      'Leiter, Bewegung und B-Feld jeweils senkrecht.',
      'Induktion, Leiter',
    ),
    f(
      'Induktivität',
      'L=\\frac{N\\Phi}{I}',
      'Magnetismus',
      'Induktivität einer linearen Spule.',
      'L [H]; N [1]; Φ [Wb]; I [A]',
      'Bei linearem magnetischem Verhalten.',
      'Induktion, Spule',
    ),
    f(
      'Selbstinduktion',
      'U_{ind}=-L\\frac{dI}{dt}',
      'Magnetismus',
      'Spannung durch Änderung des eigenen Stroms.',
      'U_ind [V]; L [H]; I [A]; t [s]',
      'Minuszeichen gemäß Lenzscher Regel.',
      'Induktion, Selbstinduktion',
    ),
    f(
      'Energie einer Spule',
      'E_L=\\frac12LI^2',
      'Magnetismus',
      'Im Magnetfeld einer Induktivität gespeicherte Energie.',
      'E_L [J]; L [H]; I [A]',
      'Lineare Induktivität.',
      'Induktion, Energie',
    ),
    f(
      'Kreisbahn im Magnetfeld',
      'r=\\frac{mv}{|q|B}',
      'Magnetismus',
      'Radius eines geladenen Teilchens im Magnetfeld.',
      'r [m]; m [kg]; v [m/s]; q [C]; B [T]',
      'v senkrecht zu B; relativistische Effekte vernachlässigt.',
      'Lorentzkraft, Kreisbahn',
    ),
    f(
      'Harmonische Schwingung',
      'x(t)=A\\sin(\\omega t+\\varphi_0)',
      'Schwingungen',
      'Auslenkung einer harmonischen Schwingung.',
      'x,A [m]; ω [rad/s]; t [s]; φ₀ [rad]',
      'Ungedämpfte harmonische Schwingung.',
      'Schwingung, Sinus',
    ),
    f(
      'Schwingungsgeschwindigkeit',
      'v(t)=A\\omega\\cos(\\omega t+\\varphi_0)',
      'Schwingungen',
      'Zeitliche Ableitung der harmonischen Auslenkung.',
      'v [m/s]; A [m]; ω [rad/s]; t [s]',
      'Ungedämpfte harmonische Schwingung.',
      'Schwingung, Geschwindigkeit',
    ),
    f(
      'Rückstellbeschleunigung',
      'a=-\\omega^2x',
      'Schwingungen',
      'Beschleunigung ist entgegengesetzt zur Auslenkung.',
      'a [m/s²]; ω [rad/s]; x [m]',
      'Harmonische Schwingung.',
      'Schwingung, Beschleunigung',
    ),
    f(
      'Kreisfrequenz Federpendel',
      '\\omega=\\sqrt{\\frac{D}{m}}',
      'Schwingungen',
      'Kreisfrequenz eines idealen Federpendels.',
      'ω [rad/s]; D [N/m]; m [kg]',
      'Ungedämpftes ideales Federpendel.',
      'Feder, Schwingung',
    ),
    f(
      'Kreisfrequenz Fadenpendel',
      '\\omega=\\sqrt{\\frac{g}{l}}',
      'Schwingungen',
      'Kreisfrequenz eines mathematischen Pendels.',
      'ω [rad/s]; g [m/s²]; l [m]',
      'Nur für kleine Auslenkungen.',
      'Pendel, Schwingung',
    ),
    f(
      'Schwingungsenergie',
      'E_{ges}=\\frac12DA^2',
      'Schwingungen',
      'Gesamtenergie eines idealen Federpendels.',
      'E_ges [J]; D [N/m]; A [m]',
      'Ungedämpftes Federpendel.',
      'Feder, Energie',
    ),
    f(
      'Wellenzahl',
      'k=\\frac{2\\pi}{\\lambda}',
      'Wellen',
      'Räumliche Phasenänderung einer Welle.',
      'k [rad/m]; λ [m]',
      'Sinusförmige Wellen.',
      'Welle, Wellenzahl',
    ),
    f(
      'Wellengleichung',
      'y(x,t)=A\\sin(\\omega t-kx+\\varphi_0)',
      'Wellen',
      'Auslenkung einer harmonischen, nach +x laufenden Welle.',
      'y,A [m]; ω [rad/s]; k [rad/m]; x [m]; t [s]',
      'Eindimensionale harmonische Welle.',
      'Welle, Sinus',
    ),
    f(
      'Phasendifferenz',
      '\\Delta\\varphi=2\\pi\\frac{\\Delta s}{\\lambda}',
      'Wellen',
      'Phasenverschiebung durch Wegunterschied.',
      'Δφ [rad]; Δs,λ [m]',
      'Monochromatische Welle.',
      'Welle, Phase',
    ),
    f(
      'Stehende Welle',
      '\\lambda_n=\\frac{2L}{n}',
      'Wellen',
      'Erlaubte Wellenlängen bei zwei festen Enden.',
      'λ_n,L [m]; n=1,2,…',
      'Saite oder Rohr mit zwei Knoten an den Enden.',
      'Stehende Welle, Resonanz',
    ),
    f(
      'Eigenfrequenz Saite',
      'f_n=\\frac{nv}{2L}',
      'Wellen',
      'Eigenfrequenz der n-ten Mode bei zwei festen Enden.',
      'f_n [Hz]; n [1]; v [m/s]; L [m]',
      'Ideale Saite oder passendes Rohrmodell.',
      'Stehende Welle, Frequenz',
    ),
    f(
      'Brechkraft',
      'D=\\frac1f',
      'Optik',
      'Brechkraft einer Linse.',
      'D [dpt = 1/m]; f [m]',
      'Dünne Linse in Luft.',
      'Linse, Brechkraft',
    ),
    f(
      'Abbildungsmaßstab mit Vorzeichen',
      '\\beta=\\frac{B}{G}=-\\frac{b}{g}',
      'Optik',
      'Negatives Vorzeichen steht für ein umgekehrtes reelles Bild.',
      'β [1]; B,G,b,g [m]',
      'Dünne Linse mit kartesischer Vorzeichenkonvention.',
      'Linse, Abbildung',
    ),
    f(
      'Grenzwinkel Totalreflexion',
      '\\sin(\\alpha_G)=\\frac{n_2}{n_1}',
      'Optik',
      'Grenzwinkel für den Beginn der Totalreflexion.',
      'α_G [°]; n₁,n₂ [1]',
      'Nur für n₁>n₂; Licht aus optisch dichterem Medium.',
      'Totalreflexion, Brechung',
    ),
    f(
      'Einzelspalt-Minimum',
      'b\\sin(\\alpha)=k\\lambda',
      'Optik',
      'Lage der Minima hinter einem Einzelspalt.',
      'b,λ [m]; α [°]; k=±1,±2,…',
      'Fraunhofer-Beugung; k=0 ist kein Minimum.',
      'Beugung, Einzelspalt',
    ),
    f(
      'Beugungsgitter-Maximum',
      'd\\sin(\\alpha)=k\\lambda',
      'Optik',
      'Hauptmaxima eines Beugungsgitters.',
      'd,λ [m]; α [°]; k [1]',
      'Senkrechter Einfall, Fraunhofer-Näherung.',
      'Beugung, Gitter',
    ),
    f(
      'Doppelspalt-Minimum',
      'd\\sin(\\alpha)=(k+\\frac12)\\lambda',
      'Optik',
      'Minima der Doppelspaltinterferenz.',
      'd,λ [m]; α [°]; k [1]',
      'Senkrechter Einfall; endliche Spaltbreite vernachlässigt.',
      'Doppelspalt, Interferenz',
    ),
    f(
      'Photonenimpuls',
      'p=\\frac{h}{\\lambda}',
      'Quantenphysik',
      'Impuls eines Photons im Vakuum.',
      'p [kg·m/s]; h [J·s]; λ [m]',
      'Photon im Vakuum.',
      'Photon, Impuls',
    ),
    f(
      'Photoeffekt',
      'E_{kin,max}=hf-W_A',
      'Quantenphysik',
      'Maximale kinetische Energie ausgelöster Elektronen.',
      'E_kin,max,W_A [J]; h [J·s]; f [Hz]',
      'Idealisierter Photoeffekt; nur oberhalb Grenzfrequenz.',
      'Photoeffekt, Photon',
    ),
    f(
      'Gegenfeldmethode',
      'eU_g=E_{kin,max}',
      'Quantenphysik',
      'Zusammenhang von Grenzspannung und maximaler Elektronenenergie.',
      'e [C]; U_g [V]; E_kin,max [J]',
      'Photoeffekt mit Gegenfeld.',
      'Photoeffekt, Spannung',
    ),
    f(
      'Heisenbergsche Unschärfe',
      '\\Delta x\\Delta p\\geq\\frac{\\hbar}{2}',
      'Quantenphysik',
      'Grundlegende untere Schranke simultaner Orts- und Impulsunschärfe.',
      'Δx [m]; Δp [kg·m/s]; ħ [J·s]',
      'Quantenmechanische Standardabweichungen.',
      'Quantenphysik, Unschärfe',
    ),
    f(
      'Bohr-Energieniveaus',
      'E_n=-\\frac{13.6\\,\\mathrm{eV}}{n^2}',
      'Atomphysik',
      'Energie des Elektrons im Wasserstoffatom.',
      'E_n [eV]; n=1,2,…',
      'Bohrsches Modell für wasserstoffähnliche Atome (Z=1).',
      'Atom, Bohr',
    ),
    f(
      'Bohr-Radius',
      'r_n=n^2r_1',
      'Atomphysik',
      'Bahnradius im Bohrschen Wasserstoffmodell.',
      'r_n,r₁ [m]; n [1]',
      'Wasserstoffatom im Bohr-Modell.',
      'Atom, Bohr',
    ),
    f(
      'Spektrallinie',
      '\\lambda=\\frac{hc}{\\Delta E}',
      'Atomphysik',
      'Wellenlänge eines Photons bei einem Energieübergang.',
      'λ [m]; h [J·s]; c [m/s]; ΔE [J]',
      'Betrag der Energiedifferenz verwenden.',
      'Atom, Spektrum',
    ),
    f(
      'Radioaktiver Zerfall',
      'N(t)=N_0e^{-\\lambda t}',
      'Kernphysik / Radioaktivität',
      'Noch nicht zerfallene Kerne nach der Zeit t.',
      'N,N₀ [1]; λ [1/s]; t [s]',
      'Konstante Zerfallswahrscheinlichkeit.',
      'Radioaktivität, Zerfall',
    ),
    f(
      'Aktivität',
      'A=\\lambda N',
      'Kernphysik / Radioaktivität',
      'Zerfälle pro Zeit.',
      'A [Bq = 1/s]; λ [1/s]; N [1]',
      'Radioaktiver Zerfall.',
      'Radioaktivität, Aktivität',
    ),
    f(
      'Halbwertszeit',
      'T_{1/2}=\\frac{\\ln 2}{\\lambda}',
      'Kernphysik / Radioaktivität',
      'Zeit bis zur Halbierung der Kernanzahl.',
      'T₁/₂ [s]; λ [1/s]',
      'Exponentieller radioaktiver Zerfall.',
      'Radioaktivität, Halbwertszeit',
    ),
    f(
      'Zerfall nach Halbwertszeiten',
      'N=N_0\\left(\\frac12\\right)^n',
      'Kernphysik / Radioaktivität',
      'Restmenge nach n Halbwertszeiten.',
      'N,N₀ [1]; n [1]',
      'Exponentieller radioaktiver Zerfall.',
      'Radioaktivität, Zerfall',
    ),
    f(
      'Massendefekt',
      '\\Delta m=Zm_p+Nm_n-m_{Kern}',
      'Kernphysik / Radioaktivität',
      'Massendifferenz aus freien Nukleonen und Kern.',
      'Δm,m_p,m_n,m_Kern [kg]; Z,N [1]',
      'Atomare Elektronenmassen ggf. konsistent berücksichtigen.',
      'Kernphysik, Massendefekt',
    ),
    f(
      'Kernbindungsenergie',
      'E_B=\\Delta mc^2',
      'Kernphysik / Radioaktivität',
      'Energie zum vollständigen Trennen eines Kerns.',
      'E_B [J]; Δm [kg]; c [m/s]',
      'Massendefekt aus konsistenten Massen.',
      'Kernphysik, Bindung',
    ),
    f(
      'Lorentzfaktor',
      '\\gamma=\\frac{1}{\\sqrt{1-v^2/c^2}}',
      'Relativität',
      'Faktor der speziellen Relativitätstheorie.',
      'γ [1]; v,c [m/s]',
      'Nur für v<c im Inertialsystem.',
      'Relativität, Lorentz',
    ),
    f(
      'Relativistische Gesamtenergie',
      'E=\\gamma mc^2',
      'Relativität',
      'Gesamtenergie eines Teilchens inklusive Ruheenergie.',
      'E [J]; γ [1]; m [kg]; c [m/s]',
      'Spezielle Relativitätstheorie.',
      'Relativität, Energie',
    ),
    f(
      'Relativistische kinetische Energie',
      'E_{kin}=(\\gamma-1)mc^2',
      'Relativität',
      'Kinetische Energie bei relativistischen Geschwindigkeiten.',
      'E_kin [J]; γ [1]; m [kg]; c [m/s]',
      'Spezielle Relativitätstheorie.',
      'Relativität, Energie',
    ),
    f(
      'Relativistischer Impuls',
      'p=\\gamma mv',
      'Relativität',
      'Impuls eines relativistisch bewegten Teilchens.',
      'p [kg·m/s]; γ [1]; m [kg]; v [m/s]',
      'Spezielle Relativitätstheorie.',
      'Relativität, Impuls',
    ),
    f(
      'Volumenarbeit',
      'W=-p\\Delta V',
      'Thermodynamik',
      'Arbeit am System bei konstantem Außendruck.',
      'W [J]; p [Pa]; ΔV [m³]',
      'Hier gilt die in der App verwendete Konvention ΔU=Q+W.',
      'Thermodynamik, Arbeit',
    ),
    f(
      'Ideale Gasgleichung',
      'pV=nRT',
      'Thermodynamik',
      'Zustandsgleichung eines idealen Gases.',
      'p [Pa]; V [m³]; n [mol]; R [J/(mol·K)]; T [K]',
      'Für ideales Gas; Temperatur in Kelvin.',
      'Gas, Thermodynamik',
    ),
    f(
      'Ideales Gas mit Teilchenzahl',
      'pV=Nk_BT',
      'Thermodynamik',
      'Mikroskopische Form der idealen Gasgleichung.',
      'p [Pa]; V [m³]; N [1]; k_B [J/K]; T [K]',
      'Für ideales Gas.',
      'Gas, Thermodynamik',
    ),
    f(
      'Temperaturumrechnung',
      'T[\\mathrm K]=\\vartheta[^{\\circ}\\mathrm C]+273.15',
      'Thermodynamik',
      'Umrechnung von Celsius in Kelvin.',
      'T [K]; θ [°C]',
      'Temperaturdifferenzen haben in K und °C denselben Zahlenwert.',
      'Temperatur, Umrechnung',
    ),
  ];
  more.push(
    f(
      'Zentripetalbeschleunigung mit ω',
      'a_Z=\\omega^2r',
      'Kreisbewegung',
      'Zentripetalbeschleunigung über die Winkelgeschwindigkeit.',
      'a_Z [m/s²]; ω [rad/s]; r [m]',
      'Gleichförmige Kreisbewegung.',
      'Kreisbewegung, Beschleunigung',
    ),
    f(
      'Winkelgleichung ohne Zeit',
      '\\omega^2=\\omega_0^2+2\\alpha\\Delta\\varphi',
      'Kreisbewegung',
      'Verknüpft Winkelgeschwindigkeit und Winkelweg ohne Zeit.',
      'ω,ω₀ [rad/s]; α [rad/s²]; Δφ [rad]',
      'Für konstante Winkelbeschleunigung.',
      'Rotation, Kinematik',
    ),
    f(
      'Reibungszahl',
      '\\mu=\\frac{F_R}{F_N}',
      'Dynamik',
      'Verhältnis von Reibungs- zu Normalkraft.',
      'μ [1]; F_R,F_N [N]',
      'Bei Coulomb-Reibung.',
      'Reibung, Normalkraft',
    ),
    f(
      'Lorentzkraft mit Winkel',
      'F_L=|q|vB\\sin(\\alpha)',
      'Magnetismus',
      'Betrag der Kraft auf eine bewegte Ladung im Magnetfeld.',
      'F_L [N]; q [C]; v [m/s]; B [T]; α [°]',
      'α ist der Winkel zwischen v und B.',
      'Lorentzkraft, Magnetfeld',
    ),
    f(
      'Kraft auf Leiter mit Winkel',
      'F=BIl\\sin(\\alpha)',
      'Magnetismus',
      'Betrag der Kraft auf einen stromdurchflossenen Leiter.',
      'F [N]; B [T]; I [A]; l [m]; α [°]',
      'α ist der Winkel zwischen Leiter und Magnetfeld.',
      'Magnetismus, Leiter',
    ),
    f(
      'Kondensatorladung beim Laden',
      'Q(t)=Q_0(1-e^{-t/(RC)})',
      'Elektrizitätslehre',
      'Ladung eines aufgeladenen RC-Glieds.',
      'Q,Q₀ [C]; t,RC [s]',
      'Spannungssprung am Reihenschaltkreis aus R und C.',
      'Kondensator, Aufladung',
    ),
    f(
      'Strom beim Laden eines Kondensators',
      'I(t)=\\frac{U_0}{R}e^{-t/(RC)}',
      'Elektrizitätslehre',
      'Strom eines RC-Glieds während der Aufladung.',
      'I [A]; U₀ [V]; R [Ω]; t,RC [s]',
      'Spannungssprung am Reihenschaltkreis aus R und C.',
      'Kondensator, Aufladung',
    ),
    f(
      'Konstruktive Interferenz',
      '\\Delta s=k\\lambda',
      'Wellen',
      'Bedingung für gleichphasige Überlagerung und ein Maximum.',
      'Δs,λ [m]; k [1]',
      'Kohärente Wellen gleicher Wellenlänge.',
      'Interferenz, Wellen',
    ),
    f(
      'Destruktive Interferenz',
      '\\Delta s=(k+\\frac12)\\lambda',
      'Wellen',
      'Bedingung für gegenphasige Überlagerung und ein Minimum.',
      'Δs,λ [m]; k [1]',
      'Kohärente Wellen gleicher Wellenlänge.',
      'Interferenz, Wellen',
    ),
    f(
      'Aktivität im Zeitverlauf',
      'A(t)=A_0e^{-\\lambda t}',
      'Kernphysik / Radioaktivität',
      'Zeitlicher Verlauf der Aktivität eines radioaktiven Präparats.',
      'A,A₀ [Bq]; λ [1/s]; t [s]',
      'Konstante Zerfallswahrscheinlichkeit.',
      'Radioaktivität, Aktivität',
    ),
  );
  const known = new Set(seed.map((x) => `${x.category}|${x.latex}`));
  more.forEach((x) => {
    if (!known.has(`${x.category}|${x.latex}`)) seed.push(x);
  });
  ['Kernphysik / Radioaktivität', 'Relativität'].forEach((x, i) => {
    if (!CATEGORIES.includes(x)) {
      CATEGORIES.push(x);
      ICONS.push(i ? '◷' : '☢');
    }
  });
  const coulomb = seed.find((x) => x.name === 'Coulomb-Gesetz');
  if (coulomb) {
    coulomb.latex = 'F_C=\\frac{1}{4\\pi\\varepsilon_0}\\frac{|q_1q_2|}{r^2}';
    coulomb.application = 'Betrag der Kraft zwischen Punktladungen im Vakuum.';
  }

  const constants = [
    ['Fallbeschleunigung', 'g=9.81\\,\\mathrm{m/s^2}', 'Nahe der Erdoberfläche.'],
    [
      'Gravitationskonstante',
      'G=6.67430\\cdot10^{-11}\\,\\mathrm{N\\,m^2/kg^2}',
      'Exakter SI-Wert mit Messunsicherheit.',
    ],
    [
      'Elektrische Feldkonstante',
      '\\varepsilon_0=8.8541878128\\cdot10^{-12}\\,\\mathrm{F/m}',
      'Vakuumpermittivität.',
    ],
    [
      'Magnetische Feldkonstante',
      '\\mu_0\\approx1.25663706212\\cdot10^{-6}\\,\\mathrm{H/m}',
      'Vakuumpermeabilität; nicht mehr exakt definiert.',
    ],
    ['Lichtgeschwindigkeit', 'c_0=299792458\\,\\mathrm{m/s}', 'Exakt im Vakuum.'],
    ['Planck-Konstante', 'h=6.62607015\\cdot10^{-34}\\,\\mathrm{J\\,s}', 'Exakt definiert.'],
    ['Reduzierte Planck-Konstante', '\\hbar=\\frac{h}{2\\pi}', '≈ 1.054571817·10⁻³⁴ J·s.'],
    ['Elementarladung', 'e=1.602176634\\cdot10^{-19}\\,\\mathrm C', 'Exakt definiert.'],
    ['Boltzmann-Konstante', 'k_B=1.380649\\cdot10^{-23}\\,\\mathrm{J/K}', 'Exakt definiert.'],
    ['Universelle Gaskonstante', 'R=8.314462618\\,\\mathrm{J/(mol\\,K)}', 'Für ideale Gase.'],
    ['Elektronenmasse', 'm_e=9.109\\cdot10^{-31}\\,\\mathrm{kg}', 'Gerundeter Wert.'],
    ['Protonenmasse', 'm_p=1.673\\cdot10^{-27}\\,\\mathrm{kg}', 'Gerundeter Wert.'],
    ['Neutronenmasse', 'm_n=1.675\\cdot10^{-27}\\,\\mathrm{kg}', 'Gerundeter Wert.'],
    [
      'Vakuumbeziehung',
      'c_0=\\frac{1}{\\sqrt{\\varepsilon_0\\mu_0}}',
      'Für elektromagnetische Wellen im Vakuum.',
    ],
  ];
  state.sort = state.sort || 'default';
  state.light = localStorage.getItem('plk-light') === 'true';
  document.body.classList.toggle('light', state.light);
  document.body.classList.remove('classic');
  localStorage.removeItem('plk-theme');
  const nativeRender = render;
  const nativeFiltered = filtered;
  filtered = function () {
    const items = nativeFiltered();
    const s = state.sort;
    return s === 'alpha'
      ? items.sort((a, b) => a.name.localeCompare(b.name, 'de'))
      : s === 'newest'
        ? items.sort((a, b) => b.created - a.created)
        : s === 'favorites'
          ? items.sort(
              (a, b) => Number(state.favorites.has(b.id)) - Number(state.favorites.has(a.id)),
            )
          : s === 'category'
            ? items.sort(
                (a, b) =>
                  a.category.localeCompare(b.category, 'de') || a.name.localeCompare(b.name, 'de'),
              )
            : items;
  };
  render = function () {
    nativeRender();
    enhance();
  };
  function formulaDay() {
    const day = Math.floor(Date.now() / 86400000);
    return all()[day % all().length];
  }
  const workedExamples = {
    'Kinetische Energie': {
      s: 'Ein Fahrradfahrer mit m = 80 kg fährt v = 5.0 m/s.',
      g: 'E_{kin}',
      r: 'E_{kin}=\\frac12\\cdot80\\,\\mathrm{kg}\\cdot(5.0\\,\\mathrm{m/s})^2=1000\\,\\mathrm{J}',
      e: 'E_kin = 1.0 kJ',
      i: 'Die Bewegungsenergie wächst quadratisch mit der Geschwindigkeit.',
      x: 'v muss in m/s eingesetzt und quadriert werden.',
    },
    'Newton II': {
      s: 'Ein Einkaufswagen mit m = 25 kg wird mit a = 1.2 m/s² beschleunigt.',
      g: 'F',
      r: 'F=25\\,\\mathrm{kg}\\cdot1.2\\,\\mathrm{m/s^2}=30\\,\\mathrm{N}',
      e: 'F = 30 N',
      i: 'Die resultierende Kraft bestimmt die Beschleunigung des Wagens.',
      x: 'Nicht eine einzelne Teilkraft, sondern die resultierende Kraft verwenden.',
    },
    Gewichtskraft: {
      s: 'Ein Rucksack mit m = 8.0 kg steht nahe der Erdoberfläche.',
      g: 'F_G',
      r: 'F_G=8.0\\,\\mathrm{kg}\\cdot9.81\\,\\mathrm{m/s^2}=78.5\\,\\mathrm{N}',
      e: 'F_G ≈ 79 N',
      i: 'Das ist die Kraft, mit der der Rucksack an der Auflage zieht.',
      x: 'Masse in kg nicht mit der Gewichtskraft in N verwechseln.',
    },
    'Ohmsches Gesetz': {
      s: 'An einem Widerstand von R = 12 Ω fließt ein Strom I = 0.50 A.',
      g: 'U',
      r: 'U=12\\,\\Omega\\cdot0.50\\,\\mathrm A=6.0\\,\\mathrm V',
      e: 'U = 6.0 V',
      i: 'Die Batterie muss 6 V bereitstellen.',
      x: 'Das Gesetz gilt für ohmsche Leiter bei konstanter Temperatur.',
    },
    'Elektrische Leistung': {
      s: 'Ein Gerät wird mit U = 12 V und I = 2.0 A betrieben.',
      g: 'P',
      r: 'P=12\\,\\mathrm V\\cdot2.0\\,\\mathrm A=24\\,\\mathrm W',
      e: 'P = 24 W',
      i: 'Das Gerät setzt jede Sekunde 24 J Energie um.',
      x: 'Watt ist J/s; Spannung und Strom nicht addieren.',
    },
    Wärmemenge: {
      s: '0.50 kg Wasser werden um ΔT = 20 K erwärmt; c = 4180 J/(kg·K).',
      g: 'Q',
      r: 'Q=0.50\\,\\mathrm{kg}\\cdot4180\\,\\mathrm{J/(kg\\,K)}\\cdot20\\,\\mathrm K=41800\\,\\mathrm J',
      e: 'Q = 41.8 kJ',
      i: 'Diese Energie wird ohne Phasenwechsel als Wärme aufgenommen.',
      x: 'Temperaturdifferenzen in K und °C sind gleich groß; nicht die Celsius-Temperatur selbst einsetzen.',
    },
    Wellengeschwindigkeit: {
      s: 'Eine Wasserwelle besitzt λ = 2.0 m und f = 0.80 Hz.',
      g: 'v',
      r: 'v=2.0\\,\\mathrm m\\cdot0.80\\,\\mathrm{s^{-1}}=1.6\\,\\mathrm{m/s}',
      e: 'v = 1.6 m/s',
      i: 'In einer Sekunde wandert ein Wellenberg 1.6 m weit.',
      x: 'Frequenz in Hz ist 1/s, nicht die Periodendauer.',
    },
    Fadenpendel: {
      s: 'Ein Pendel hat die Länge l = 1.00 m; g = 9.81 m/s².',
      g: 'T',
      r: 'T=2\\pi\\sqrt{\\frac{1.00\\,\\mathrm m}{9.81\\,\\mathrm{m/s^2}}}=2.01\\,\\mathrm s',
      e: 'T ≈ 2.01 s',
      i: 'Eine volle Hin- und Herbewegung dauert etwa zwei Sekunden.',
      x: 'Die Formel gilt nur für kleine Auslenkungswinkel.',
    },
  };
  const fallback = {
    scenario: 'Betrachte ein realistisches Experiment aus dem angegebenen Anwendungsbereich.',
    given: 'Die Größen werden in SI-Einheiten aus der Variablentabelle gemessen.',
    result: 'Das Ergebnis trägt die Einheit der gesuchten Größe.',
    interpretation:
      'Die Gleichung beschreibt den quantitativen Zusammenhang der beteiligten physikalischen Größen.',
    error:
      'Vorzeichen, Einheiten und die in der Anwendung genannten Gültigkeitsbedingungen prüfen.',
  };
  function lessonDialog(f, section = 'all') {
    const ex = workedExamples[f.name] || fallback;
    const d = document.querySelector('#formula-dialog');
    const example = workedExamples[f.name]
      ? `<section class="learn-block"><h3>Beispielrechnung</h3><p><b>Situation:</b> ${ex.s}</p><p><b>Gesucht:</b> ${ex.g}</p><p><b>Rechnung:</b></p>${math(ex.r)}<p><b>Ergebnis:</b> ${ex.e}</p><p><b>💡 Was bedeutet das?</b> ${ex.i}</p></section>`
      : `<section class="learn-block"><h3>Physikalisches Beispiel</h3><p>${ex.scenario} ${f.application}</p><p><b>Gegeben:</b> ${ex.given}</p><p><b>Gesucht:</b> die von ${esc(f.name)} beschriebene Größe.</p><p><b>Rechenschema:</b> Werte mit ihren SI-Einheiten in die Gleichung einsetzen, Einheiten kürzen und sinnvoll runden.</p><p><b>💡 Was bedeutet das?</b> ${ex.interpretation}</p></section>`;
    const explain = `<section class="learn-block"><h3>Erklärung & Gültigkeit</h3><p>${esc(f.description)}</p><p><b>Gültigkeitsbedingungen:</b> ${esc(f.application)}</p><h3>Variablen und SI-Einheiten</h3><p>${esc(f.variables)}</p></section>`;
    const errors = `<section class="learn-block warning"><h3>⚠️ Typische Fehler</h3><p>${workedExamples[f.name]?.x || ex.error}</p></section>`;
    d.innerHTML = `<div class="dialog-content learning-dialog"><div class="dialog-title"><div><span class="eyebrow">LERNKARTE</span><h2>${esc(f.name)}</h2></div><button class="button" data-close>×</button></div>${math(f.latex)}${section === 'example' ? example : section === 'errors' ? errors : explain + example + errors}<div class="dialog-actions"><button class="button" data-close>Schließen</button></div></div>`;
    d.showModal();
  }
  function enhance() {
    const navEl = document.querySelector('.nav');
    navEl?.querySelector('[data-nav="help"]')?.remove();
    if (navEl && !navEl.querySelector('[data-extra="constants"]'))
      navEl.insertAdjacentHTML(
        'beforeend',
        '<button data-extra="constants">⌘ Konstanten</button><button data-extra="exercise-lks">✎ Übungs-LKs</button>',
      );
    const side = document.querySelector('.side-footer');
    if (side && !side.querySelector('#light-switch'))
      side.insertAdjacentHTML(
        'afterbegin',
        `<button class="mode" id="light-switch">${state.light ? '☾ Dark Mode' : '☀ Light Mode'}</button>`,
      );
    if (state.page === 'constants') {
      document.querySelector('#app').innerHTML =
        `<section class="constants-page"><div class="section-head"><div><h1 class="page-title">Physikalische Konstanten</h1><p>Praktische SI-Werte für Rechnungen im Physik-LK.</p></div></div><div class="constant-table"><table><thead><tr><th>Konstante</th><th>Wert</th><th>Hinweis</th></tr></thead><tbody>${constants.map(([n, l, h]) => `<tr><td>${n}</td><td>${math(l)}</td><td>${h}</td></tr>`).join('')}</tbody></table></div></section>`;
    }
    document.querySelector('.brand small')?.remove();
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.querySelector('.eyebrow')?.remove();
      hero.querySelector('h1').textContent = 'Gleichungssammlung Physik LK';
      hero.querySelector('p')?.remove();
    }
    if (hero && !hero.querySelector('.formula-day')) {
      const x = formulaDay();
      hero.insertAdjacentHTML(
        'beforeend',
        `<article class="formula-day"><div><span class="eyebrow">⚡ GLEICHUNG DES TAGES</span><h2>${x.name}</h2>${math(x.latex)}<p>${x.description}</p></div><button class="button primary" data-detail="${x.id}">Details ansehen</button></article>`,
      );
    }
    const filters = document.querySelector('.filters');
    if (filters && !filters.querySelector('#sort-filter'))
      filters.insertAdjacentHTML(
        'beforeend',
        `<select id="sort-filter" title="Formeln sortieren"><option value="default">Sortierung</option><option value="alpha" ${state.sort === 'alpha' ? 'selected' : ''}>Alphabet</option><option value="category" ${state.sort === 'category' ? 'selected' : ''}>Kategorie</option><option value="newest" ${state.sort === 'newest' ? 'selected' : ''}>Zuletzt hinzugefügt</option><option value="favorites" ${state.sort === 'favorites' ? 'selected' : ''}>Favoriten</option></select>`,
      );
    if (state.page === 'list') {
      const h = document.querySelector('.section-head p');
      if (h && !h.querySelector('.list-info'))
        h.innerHTML += ` <span class="list-info">• ${all().filter((x) => x.category === state.category).length} insgesamt · zuletzt: ${
          all()
            .filter((x) => x.category === state.category)
            .sort((a, b) => b.created - a.created)[0]?.name || '—'
        }</span>`;
    }
    localizeTerminology();
    if (!document.querySelector('#site-footer'))
      document
        .querySelector('.app-shell')
        .insertAdjacentHTML(
          'afterend',
          '<footer id="site-footer">Erstellt von Andrii Nikolaichuk</footer>',
        );
  }
  function localizeTerminology() {
    const walker = document.createTreeWalker(
      document.querySelector('.app-shell'),
      NodeFilter.SHOW_TEXT,
    );
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(
      (n) =>
        (n.nodeValue = n.nodeValue
          .replace(/Formeln/g, 'Gleichungen')
          .replace(/Formel/g, 'Gleichung')
          .replace(/formeln/g, 'gleichungen')
          .replace(/formel/g, 'gleichung')),
    );
    const search = document.querySelector('#global-search');
    if (search) search.placeholder = 'Gleichung, Thema oder Variable suchen …';
  }
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-extra]');
    if (!b) return;
    state.page = b.dataset.extra;
    state.category = '';
    state.query = '';
    render();
  });
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-exercise-new]');
    if (!b) return;

    const dialog = document.querySelector('#formula-dialog');

    dialog.innerHTML = `
      <div class="dialog-content">
        <div class="dialog-title">
          <div>
            <span class="eyebrow">ÜBUNGS-LK</span>
            <h2>Neue Übungs-LK</h2>
          </div>
          <button class="button" data-close>×</button>
        </div>

        <label>
          Titel
          <input id="exercise-title" type="text" placeholder="z. B. Energie & Impuls" />
        </label>

        <label>
          Beschreibung
          <textarea id="exercise-description" rows="4" placeholder="Kurze Beschreibung der Übungs-LK"></textarea>
        </label>

        <div class="dialog-actions">
          <button class="button" data-close>Abbrechen</button>
          <button class="button primary" data-exercise-save>Speichern</button>
        </div>
      </div>
    `;

    dialog.showModal();
  });
  document.addEventListener('click', async (e) => {
    const b = e.target.closest('[data-exercise-save]');
    if (!b) return;

    const title = document.querySelector('#exercise-title')?.value.trim();
    const description = document.querySelector('#exercise-description')?.value.trim();

    if (!title) {
      alert('Bitte gib einen Titel ein.');
      return;
    }

    b.disabled = true;
    b.textContent = 'Speichern...';

    const { error } = await window.supabaseClient
      .from('exercise_lks')
      .insert({
        title,
        description: description || null,
      });

    if (error) {
      console.error(error);
      alert('Fehler beim Speichern: ' + error.message);
      b.disabled = false;
      b.textContent = 'Speichern';
      return;
    }

    document.querySelector('#formula-dialog')?.close();

    alert('Übungs-LK wurde gespeichert.');
  });

  document.addEventListener(
    'click',
    (e) => {
      const close = e.target.closest('[data-close]');
      if (close) {
        e.preventDefault();
        e.stopImmediatePropagation();
        const dialog = close.closest('dialog') || document.querySelector('#formula-dialog');
        if (dialog?.open) dialog.close();
        return;
      }
      const overview = e.target.closest('.back[data-nav="home"]');
      if (overview) {
        e.preventDefault();
        e.stopImmediatePropagation();
        state.page = 'home';
        state.category = '';
        state.query = '';
        render();
        return;
      }
      const back = e.target.closest('[data-back]');
      if (back) {
        e.preventDefault();
        e.stopImmediatePropagation();
        state.page = state.category ? 'list' : 'home';
        state.query = '';
        render();
      }
    },
    true,
  );
  document.addEventListener('change', (e) => {
    if (e.target.id === 'sort-filter') {
      if (state.page === 'mine') {
        state.mineSort = e.target.value;
      } else {
        state.sort = e.target.value;
      }
      render();
    }
  });
  document.addEventListener(
    'click',
    (e) => {
      if (!e.target.closest('#light-switch')) return;
      state.light = !state.light;
      localStorage.setItem('plk-light', String(state.light));
      document.body.classList.toggle('light', state.light);
      render();
    },
    true,
  );
  render();
})();
