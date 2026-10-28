const CATEGORIES = [
  'Kinematik',
  'Dynamik',
  'Arbeit & Energie',
  'Impuls & Stoß',
  'Kreisbewegung',
  'Gravitation',
  'Schwingungen',
  'Wellen',
  'Elektrisches Feld',
  'Elektrizitätslehre',
  'Magnetismus',
  'Optik',
  'Atomphysik',
  'Quantenphysik',
  'Thermodynamik',
];
const ICONS = ['↗', '⚙', '⚡', '◉', '◌', '◒', '〰', '∿', '⇢', '⌁', '⊙', '◈', '⚛', 'ψ', '♨'];

const supabaseClient = window.supabaseClient;

let adminUser = null;

async function checkAdmin() {
  if (!supabaseClient) return false;

  const {
    data: { user },
    error: userError,
  } = await supabaseClient.auth.getUser();

  if (userError || !user) {
    adminUser = null;
    return false;
  }

  const { data, error } = await supabaseClient
    .from('admin_users')
    .select('user_id')
    .eq('user_id', user.id)
    .maybeSingle();

  if (error || !data) {
    adminUser = null;
    return false;
  }

  adminUser = user;
  return true;
}

async function loginAdmin() {
  const email = prompt('Admin-E-Mail:');
  if (email === null) return false;

  const password = prompt('Admin-Passwort:');
  if (password === null) return false;

  const { error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    toast('Login fehlgeschlagen.');
    return false;
  }

  if (!(await checkAdmin())) {
    await supabaseClient.auth.signOut();
    toast('Dieser Account ist kein Admin.');
    return false;
  }

  return true;
}

const seed = [
  [
    'Geschwindigkeit',
    'v=\\frac{\\Delta s}{\\Delta t}',
    'Kinematik',
    'Ortsänderung pro Zeit',
    'v: Geschwindigkeit [m/s]; Δs: Weg [m]; Δt: Zeit [s]',
    'gleichförmige Bewegung',
    'Geschwindigkeit, Bewegung',
  ],
  [
    'Beschleunigung',
    'a=\\frac{\\Delta v}{\\Delta t}',
    'Kinematik',
    'Geschwindigkeitsänderung pro Zeit',
    'a: Beschleunigung [m/s²]; Δv: Geschwindigkeitsänderung [m/s]; Δt: Zeit [s]',
    'Beschleunigte Bewegung',
    'Beschleunigung, Bewegung',
  ],
  [
    'Weg-Zeit-Gesetz',
    's=s_0+v_0t+\\frac12at^2',
    'Kinematik',
    'Ort bei gleichmäßig beschleunigter Bewegung',
    's: Ort [m]; s₀: Anfangsort [m]; v₀: Anfangsgeschwindigkeit [m/s]; t: Zeit [s]; a: Beschleunigung [m/s²]',
    'Freier Fall und gleichmäßige Beschleunigung',
    'Weg, Zeit, Beschleunigung',
  ],
  [
    'Geschwindigkeits-Zeit-Gesetz',
    'v=v_0+at',
    'Kinematik',
    'Geschwindigkeit nach einer Zeit t',
    'v, v₀ [m/s]; a [m/s²]; t [s]',
    'Beschleunigte Bewegung',
    'Geschwindigkeit, Zeit',
  ],
  [
    'Wegunabhängige Kinematik',
    'v^2=v_0^2+2a\\Delta s',
    'Kinematik',
    'Verknüpft Geschwindigkeit und Weg ohne Zeit',
    'v, v₀ [m/s]; a [m/s²]; Δs [m]',
    'Bremsweg berechnen',
    'Kinematik, Bremsweg',
  ],
  [
    'Newton II',
    'F=ma',
    'Dynamik',
    'Resultierende Kraft erzeugt Beschleunigung',
    'F: Kraft [N]; m: Masse [kg]; a: Beschleunigung [m/s²]',
    'Kräfte und Bewegung',
    'Newton, Kraft',
  ],
  [
    'Gewichtskraft',
    'F_G=mg',
    'Dynamik',
    'Kraft eines Körpers im Schwerefeld nahe der Erde',
    'F_G [N]; m [kg]; g: Fallbeschleunigung [m/s²]',
    'Gewicht eines Körpers; nahe Erdoberfläche',
    'Gewichtskraft, Gravitation',
  ],
  [
    'Reibungskraft',
    'F_R=\\mu F_N',
    'Dynamik',
    'Reibung proportional zur Normalkraft',
    'F_R, F_N [N]; μ: Reibungszahl [1]',
    'Gleitreibung auf einer Fläche',
    'Reibung, Kraft',
  ],
  [
    'Zentripetalkraft',
    'F_Z=\\frac{mv^2}{r}',
    'Dynamik',
    'Nach innen gerichtete Kraft bei Kreisbewegung',
    'F_Z [N]; m [kg]; v [m/s]; r [m]',
    'Kurvenfahrt, Kreisbahn',
    'Kreisbewegung, Kraft',
  ],
  [
    'Arbeit',
    'W=Fs\\cos(\\alpha)',
    'Arbeit & Energie',
    'Übertragene Energie durch eine Kraft entlang eines Wegs',
    'W [J]; F [N]; s [m]; α [°]',
    'Schiefe Ebene; bei paralleler Kraft α = 0',
    'Arbeit, Energie',
  ],
  [
    'Kinetische Energie',
    'E_{kin}=\\frac12mv^2',
    'Arbeit & Energie',
    'Energie eines bewegten Körpers',
    'E_kin [J]; m [kg]; v [m/s]',
    'Bewegungsenergie berechnen',
    'Energie, Bewegung',
  ],
  [
    'Potentielle Energie',
    'E_{pot}=mgh',
    'Arbeit & Energie',
    'Lageenergie im homogenen Schwerefeld',
    'E_pot [J]; m [kg]; g [m/s²]; h [m]',
    'Heben eines Körpers; nahe Erdoberfläche',
    'Energie, Höhe',
  ],
  [
    'Spannenergie',
    'E_{spann}=\\frac12Ds^2',
    'Arbeit & Energie',
    'In einer idealen Feder gespeicherte Energie',
    'E_spann [J]; D: Federkonstante [N/m]; s [m]',
    'Federpendel',
    'Feder, Energie',
  ],
  [
    'Leistung',
    'P=\\frac{W}{t}',
    'Arbeit & Energie',
    'Umgesetzte Arbeit pro Zeit',
    'P [W]; W [J]; t [s]',
    'Motorleistung',
    'Leistung, Arbeit',
  ],
  [
    'Energieerhaltung',
    'E_{ges}=\\text{konstant}',
    'Arbeit & Energie',
    'In einem abgeschlossenen System bleibt die Gesamtenergie erhalten',
    'E_ges [J]',
    'Umwandlungen zwischen Energieformen',
    'Energieerhaltung',
  ],
  [
    'Impuls',
    'p=mv',
    'Impuls & Stoß',
    'Bewegungsgröße eines Körpers',
    'p [kg·m/s]; m [kg]; v [m/s]',
    'Stöße und Rückstoß',
    'Impuls, Stoß',
  ],
  [
    'Impulsänderung',
    '\\Delta p=F\\Delta t',
    'Impuls & Stoß',
    'Kraftstoß ist gleich Impulsänderung',
    'Δp [kg·m/s]; F [N]; Δt [s]',
    'Airbag, Ballstoß',
    'Kraftstoß, Impuls',
  ],
  [
    'Impulserhaltung',
    '\\sum p_{vor}=\\sum p_{nach}',
    'Impuls & Stoß',
    'Gesamtimpuls bleibt in einem abgeschlossenen System konstant',
    'p [kg·m/s]',
    'Elastische und unelastische Stöße',
    'Impulserhaltung, Stoß',
  ],
  [
    'Bahngeschwindigkeit',
    'v=\\omega r',
    'Kreisbewegung',
    'Tangentialgeschwindigkeit auf einer Kreisbahn',
    'v [m/s]; ω [rad/s]; r [m]',
    'Drehbewegungen',
    'Kreisbewegung, Winkelgeschwindigkeit',
  ],
  [
    'Kreisfrequenz',
    '\\omega=\\frac{2\\pi}{T}',
    'Kreisbewegung',
    'Winkel pro Periodendauer',
    'ω [rad/s]; T [s]',
    'Rotation und Schwingung',
    'Kreisfrequenz',
  ],
  [
    'Frequenz',
    'f=\\frac1T',
    'Kreisbewegung',
    'Anzahl der Perioden pro Sekunde',
    'f [Hz]; T [s]',
    'Periodische Vorgänge',
    'Frequenz, Periode',
  ],
  [
    'Zentripetalbeschleunigung',
    'a_Z=\\frac{v^2}{r}',
    'Kreisbewegung',
    'Beschleunigung zum Kreismittelpunkt',
    'a_Z [m/s²]; v [m/s]; r [m]',
    'Kreisbahn',
    'Kreisbewegung',
  ],
  [
    'Gravitationsgesetz',
    'F_G=G\\frac{m_1m_2}{r^2}',
    'Gravitation',
    'Anziehung zwischen zwei Massen',
    'F_G [N]; G [N·m²/kg²]; m₁,m₂ [kg]; r [m]',
    'Planeten und Satelliten',
    'Gravitation, Newton',
  ],
  [
    'Ortsabhängige Fallbeschleunigung',
    'g=G\\frac{M}{r^2}',
    'Gravitation',
    'Schwerebeschleunigung im Abstand r vom Massenzentrum',
    'g [m/s²]; G [N·m²/kg²]; M [kg]; r [m]',
    'Höhenabhängigkeit von g',
    'Gravitation, Feld',
  ],
  [
    'Orbitalgeschwindigkeit',
    'v=\\sqrt{\\frac{GM}{r}}',
    'Gravitation',
    'Geschwindigkeit einer Kreisbahn um Masse M',
    'v [m/s]; G [N·m²/kg²]; M [kg]; r [m]',
    'Satelliten; Kreisbahn vorausgesetzt',
    'Orbit, Satellit',
  ],
  [
    'Federpendel',
    'T=2\\pi\\sqrt{\\frac{m}{D}}',
    'Schwingungen',
    'Periodendauer eines idealen Federpendels',
    'T [s]; m [kg]; D [N/m]',
    'Kleine, ungedämpfte Schwingungen',
    'Feder, Schwingung',
  ],
  [
    'Fadenpendel',
    'T=2\\pi\\sqrt{\\frac{l}{g}}',
    'Schwingungen',
    'Periodendauer eines mathematischen Pendels',
    'T [s]; l [m]; g [m/s²]',
    'Nur für kleine Auslenkungen',
    'Pendel, Schwingung',
  ],
  [
    'Wellengeschwindigkeit',
    'v=\\lambda f',
    'Wellen',
    'Ausbreitungsgeschwindigkeit einer Welle',
    'v [m/s]; λ: Wellenlänge [m]; f [Hz]',
    'Licht, Schall, Wasserwellen',
    'Welle, Frequenz',
  ],
  [
    'Feldstärke',
    'E=\\frac{F}{q}',
    'Elektrisches Feld',
    'Kraft pro positiver Probeladung',
    'E [N/C = V/m]; F [N]; q [C]',
    'Homogenes elektrisches Feld',
    'Feld, Ladung',
  ],
  [
    'Elektrische Kraft',
    'F=qE',
    'Elektrisches Feld',
    'Kraft auf eine Ladung im elektrischen Feld',
    'F [N]; q [C]; E [N/C]',
    'Ablenkung geladener Teilchen',
    'Feld, Ladung',
  ],
  [
    'Plattenkondensator-Feld',
    'E=\\frac{U}{d}',
    'Elektrisches Feld',
    'Feldstärke zwischen parallelen Platten',
    'E [V/m]; U [V]; d [m]',
    'Homogenes Feld; Randeffekte vernachlässigt',
    'Kondensator, Spannung',
  ],
  [
    'Coulomb-Gesetz',
    'F_C=\\frac{1}{4\\pi\\varepsilon_0}\\frac{q_1q_2}{r^2}',
    'Elektrisches Feld',
    'Elektrostatische Kraft zweier Punktladungen',
    'F_C [N]; q₁,q₂ [C]; r [m]; ε₀ [F/m]',
    'Punktladungen im Vakuum',
    'Coulomb, Ladung',
  ],
  [
    'Stromstärke',
    'I=\\frac{Q}{t}',
    'Elektrizitätslehre',
    'Ladungsmenge pro Zeit',
    'I [A]; Q [C]; t [s]',
    'Elektrischer Strom',
    'Strom, Ladung',
  ],
  [
    'Spannung',
    'U=\\frac{W}{Q}',
    'Elektrizitätslehre',
    'Arbeit pro transportierter Ladung',
    'U [V]; W [J]; Q [C]',
    'Elektrische Energie',
    'Spannung, Arbeit',
  ],
  [
    'Ohmsches Gesetz',
    'U=RI',
    'Elektrizitätslehre',
    'Spannung an einem ohmschen Widerstand',
    'U [V]; R [Ohm]; I [A]',
    'Ohmsche Leiter bei konstanter Temperatur',
    'Widerstand, Strom',
  ],
  [
    'Elektrische Leistung',
    'P=UI',
    'Elektrizitätslehre',
    'Leistung eines elektrischen Verbrauchers',
    'P [W]; U [V]; I [A]',
    'Leistungsaufnahme',
    'Leistung, Strom',
  ],
  [
    'Elektrische Arbeit',
    'W=UIt',
    'Elektrizitätslehre',
    'Umgesetzte elektrische Energie',
    'W [J]; U [V]; I [A]; t [s]',
    'Stromkosten, Heizung',
    'Energie, Strom',
  ],
  [
    'Kapazität',
    'C=\\frac{Q}{U}',
    'Elektrizitätslehre',
    'Gespeicherte Ladung pro Spannung',
    'C [F]; Q [C]; U [V]',
    'Kondensatoren',
    'Kondensator, Ladung',
  ],
  [
    'Kondensatorenergie',
    'E=\\frac12CU^2',
    'Elektrizitätslehre',
    'Im Kondensator gespeicherte Energie',
    'E [J]; C [F]; U [V]',
    'Geladener Kondensator',
    'Kondensator, Energie',
  ],
  [
    'Lorentzkraft',
    'F=qvB',
    'Magnetismus',
    'Kraft auf eine bewegte Ladung bei senkrechter Bewegung',
    'F [N]; q [C]; v [m/s]; B [T]',
    'Geladene Teilchen; v ⟂ B',
    'Lorentzkraft, Magnetfeld',
  ],
  [
    'Kraft auf Leiter',
    'F=BIl',
    'Magnetismus',
    'Kraft auf stromdurchflossenen geraden Leiter',
    'F [N]; B [T]; I [A]; l [m]',
    'Leiterschaukel; Leiter ⟂ Feld',
    'Magnetismus, Strom',
  ],
  [
    'Magnetfeld eines Leiters',
    'B=\\frac{\\mu_0I}{2\\pi r}',
    'Magnetismus',
    'Magnetische Flussdichte um langen geraden Leiter',
    'B [T]; μ₀ [N/A²]; I [A]; r [m]',
    'Langer gerader Leiter',
    'Magnetfeld, Leiter',
  ],
  [
    'Linsengleichung',
    '\\frac1f=\\frac1g+\\frac1b',
    'Optik',
    'Zusammenhang von Brennweite, Gegenstands- und Bildweite',
    'f,g,b [m]',
    'Dünne Linsen, paraxiale Strahlen',
    'Linse, Abbildung',
  ],
  [
    'Abbildungsmaßstab',
    'V=\\frac{B}{G}=\\frac{b}{g}',
    'Optik',
    'Verhältnis von Bild- zu Gegenstandsgröße',
    'V [1]; B,G,b,g [m]',
    'Linsen und Spiegel',
    'Optik, Linse',
  ],
  [
    'Brechungsindex',
    'n=\\frac{c}{v}',
    'Optik',
    'Lichtgeschwindigkeit im Vakuum relativ zur im Medium',
    'n [1]; c,v [m/s]',
    'Licht in Medien',
    'Brechung, Licht',
  ],
  [
    'Snellius-Gesetz',
    'n_1\\sin(\\alpha_1)=n_2\\sin(\\alpha_2)',
    'Optik',
    'Gesetz der Lichtbrechung',
    'n₁,n₂ [1]; α₁,α₂ [°]',
    'Grenzfläche zweier Medien',
    'Brechung, Optik',
  ],
  [
    'Photonenenergie',
    'E=hf',
    'Atomphysik',
    'Energie eines Photons',
    'E [J]; h [J·s]; f [Hz]',
    'Photoeffekt und Spektren',
    'Photon, Energie',
  ],
  [
    'Massenergie',
    'E=mc^2',
    'Atomphysik',
    'Äquivalenz von Masse und Energie',
    'E [J]; m [kg]; c [m/s]',
    'Kernreaktionen',
    'Relativität, Energie',
  ],
  [
    'De-Broglie-Wellenlänge',
    '\\lambda=\\frac{h}{p}',
    'Quantenphysik',
    'Wellenlänge eines Teilchens',
    'λ [m]; h [J·s]; p [kg·m/s]',
    'Materiewellen',
    'Quantenphysik, Welle',
  ],
  [
    'Übergangsenergie',
    '\\Delta E=hf',
    'Quantenphysik',
    'Energieunterschied bei Photonemission oder -absorption',
    'ΔE [J]; h [J·s]; f [Hz]',
    'Atomspektren',
    'Atom, Photon',
  ],
  [
    'Wärmemenge',
    'Q=mc\\Delta T',
    'Thermodynamik',
    'Wärme für eine Temperaturänderung',
    'Q [J]; m [kg]; c [J/(kg·K)]; ΔT [K]',
    'Erwärmen ohne Phasenwechsel',
    'Wärme, Temperatur',
  ],
  [
    'Phasenwärme',
    'Q=mL',
    'Thermodynamik',
    'Wärme bei einem Phasenübergang',
    'Q [J]; m [kg]; L [J/kg]',
    'Schmelzen und Verdampfen',
    'Phasenübergang, Wärme',
  ],
  [
    'Wirkungsgrad',
    '\\eta=\\frac{E_{nutz}}{E_{zugeführt}}',
    'Thermodynamik',
    'Anteil der zugeführten Energie, der nutzbar wird',
    'η [1 oder %]; E [J]',
    'Maschinen und Kraftwerke',
    'Wirkungsgrad, Energie',
  ],
  [
    'Erster Hauptsatz',
    '\\Delta U=Q+W',
    'Thermodynamik',
    'Änderung der inneren Energie; Vorzeichenkonvention beachten',
    'ΔU, Q, W [J]',
    'Thermodynamische Prozesse',
    'Innere Energie, Wärme',
  ],
].map((x, i) => ({
  id: `seed-${i}`,
  sourceId: `seed-${i}`,
  name: x[0],
  latex: x[1],
  category: x[2],
  description: x[3],
  variables: x[4],
  application: x[5],
  tags: x[6].split(',').map((t) => t.trim()),
  type: x[2],
  created: i,
  used: 0,
  example: '',
}));
const state = {
  page: 'home',
  query: '',
  category: '',
  favorites: new Set(JSON.parse(localStorage.getItem('plk-favorites') || '[]')),
  custom: [],
  recent: JSON.parse(localStorage.getItem('plk-recent') || '[]'),
  editing: false,
  remoteLoaded: false,
  deletedSourceIds: new Set(),
  mineSort: 'recent',
  listSort: 'recent',
  openExerciseLkId: null,
  exerciseResults: {},
};
function mapRemoteFormula(row) {
  return {
    id: `db-${row.id}`,
    dbId: row.id,
    sourceId: row.source_id || null,
    name: row.title,
    latex: row.formula,
    category: row.category || CATEGORIES[0],
    description: row.explanation || '',
    variables: row.variables || '',
    application: row.application || '',
    tags: Array.isArray(row.tags) ? row.tags : [],
    type: row.category || CATEGORIES[0],
    created: row.created_at ? new Date(row.created_at).getTime() : Date.now(),
    used: 0,
    example: row.example || '',
    remote: true,
  };
}
async function migrateSeedToSupabase() {
  if (!(await checkAdmin())) return;

  const rows = seed
    .filter((f) => f.sourceId)
    .map((f) => ({
      source_id: f.sourceId,
      title: f.name,
      category: f.category,
      formula: f.latex,
      explanation: f.description || '',
      variables: f.variables || '',
      application: f.application || '',
      tags: Array.isArray(f.tags) ? f.tags : [],
      example: f.example || '',
    }));

  const { data, error } = await supabaseClient
    .from('formulas')
    .upsert(rows, { onConflict: 'source_id' })
    .select();

  if (error) {
    console.error('Migration fehlgeschlagen:', error);
    toast('Import nach Supabase fehlgeschlagen.');
    return;
  }

  console.log(`✅ ${data.length} Formeln nach Supabase importiert.`);
  toast(`${data.length} Formeln erfolgreich importiert!`);
}
async function loadDeletedFormulas() {
  const { data, error } = await supabaseClient
    .from('deleted_formulas')
    .select('source_id');

  if (error) {
    console.error('Gelöschte Formeln konnten nicht geladen werden:', error);
    return;
  }

  state.deletedSourceIds = new Set(
    data.map((row) => row.source_id)
  );
}
async function loadRemoteFormulas() {
  const { data, error } = await supabaseClient
    .from('formulas')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error('Supabase Fehler:', error);
    toast('Formeln konnten nicht geladen werden.');
    return;
  }

  state.custom = data.map(mapRemoteFormula);
  state.remoteLoaded = true;
}
const all = () => {
  if (state.remoteLoaded) {
    return [...state.custom];
  }

  return seed.filter(
    (f) => !f.sourceId || !state.deletedSourceIds.has(f.sourceId)
  );
};
const byId = (id) => all().find((f) => f.id === id);
const save = () => {
  localStorage.setItem('plk-favorites', JSON.stringify([...state.favorites]));
  localStorage.setItem('plk-recent', JSON.stringify(state.recent));
};
const esc = (s) =>
  String(s || '').replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[c],
  );
function math(latex, cls = '') {
  let content = esc(latex);
  try {
    if (window.katex)
      content = katex.renderToString(latex, { throwOnError: false, displayMode: false });
  } catch {}
  return `<div class="formula ${!window.katex ? 'plain' : ''} ${cls}">${content}</div>`;
}
function toast(message) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = message;
  document.querySelector('#toast-region').append(t);
  setTimeout(() => t.remove(), 2500);
}
function nav() {
  document.querySelector('#sidebar').innerHTML =
    `<div class="brand"><span class="brand-mark">φ</span><span>Physik LK<small>FORMELSAMMLUNG</small></span></div><nav class="nav">${[
      ['home', '⌂', 'Startseite'],
      ['favorites', '★', 'Favoriten'],
      ['mine', '✦', 'Meine Formeln'],
      ['calculator', '⌗', 'Rechner'],
      ['help', '?', 'Hilfe'],
    ]
      .map(
        ([p, i, t]) =>
          `<button class="${state.page === p ? 'active' : ''}" data-nav="${p}"><span>${i}</span>${t}</button>`,
      )
      .join(
        '',
      )}</nav><div class="side-footer"><button class="mode ${state.editing ? 'active' : ''}" id="mode">${state.editing ? '● Bearbeitungsmodus' : '○ Bearbeitungsmodus'}</button></div>`;
}
function formulaCard(f) {
  const fav = state.favorites.has(f.id);
  return `<article class="formula-card"><button class="button favorite ${fav ? 'is-favorite' : ''}" title="Favorit" data-favorite="${f.id}">${fav ? '★' : '☆'}</button><span class="eyebrow">${esc(f.category)}</span><h3 data-detail="${f.id}">${esc(f.name)}</h3>${math(f.latex)}<p>${esc(f.description)}</p><div class="tags">${f.tags
    .slice(0, 3)
    .map((t) => `<span class="tag">${esc(t)}</span>`)
    .join(
      '',
    )}</div><div class="card-actions"><button class="button" data-copy="${f.id}" title="LaTex kopieren">Kopieren</button><button class="button" data-detail="${f.id}">Details</button>${state.editing ? `<button class="button" data-edit="${f.id}">Bearbeiten</button>${(f.dbId || f.id.startsWith('custom-')) ? `<button class="button danger" data-delete="${f.id}">Löschen</button>` : ''}` : ''}</div></article>`;
}
function filtered() {
  const q = state.query.trim().toLowerCase();
  return all().filter(
    (f) =>
      (!state.category || f.category === state.category) &&
      (!q ||
        [f.name, f.latex, f.category, f.description, f.variables, f.application, ...f.tags]
          .join(' ')
          .toLowerCase()
          .includes(q)),
  );
}
function home() {
  const recent = state.recent.map(byId).filter(Boolean).slice(0, 4);
  const popular = [...all()].sort((a, b) => b.used - a.used).slice(0, 4);
  return `<section class="hero"><h1>Gleichungen verstehen.<br>Physik rechnen.</h1>${search()}</section><section><div class="section-head"><div><h2>Fachgebiete</h2><p>Wähle ein Thema und entdecke passende Formeln.</p></div></div><div class="category-grid">${CATEGORIES.map((c, i) => `<button class="category" data-category="${c}"><span class="icon">${ICONS[i]}</span><strong>${c}</strong><small>${all().filter((f) => f.category === c).length} Formeln</small></button>`).join('')}</div></section>${cardsSection('Zuletzt angesehen', recent)}${cardsSection('Häufig verwendete Gleichungen', popular)}`;
}
function cardsSection(title, list) {
  return list.length
    ? `<section><div class="section-head"><h2>${title}</h2></div><div class="formula-grid">${list.map(formulaCard).join('')}</div></section>`
    : '';
}
function search() {
  return `<div class="searchbar"><span>⌕</span><input id="global-search" value="${esc(state.query)}" placeholder="Formel, Thema oder Variable suchen …" autofocus><kbd>Esc</kbd></div>`;
}
function listing(title, subtitle = '') {
  const items = [...filtered()];

  return `<section><div class="section-head"><div><button class="button ghost back" data-nav="home">← Übersicht</button><h1 class="page-title">${esc(title)}</h1><p>${subtitle || `${items.length} Formeln gefunden`}</p></div></div>${search()}<div class="filters"><select id="category-filter"><option value="">Alle Kategorien</option>${CATEGORIES.map((c) => `<option ${state.category === c ? 'selected' : ''}>${c}</option>`).join('')}</select><button class="button" data-sort="popular">Häufig verwendet</button><button class="button" data-sort="recent">Zuletzt hinzugefügt</button></div><div class="formula-grid">${items.map(formulaCard).join('') || '<div class="empty">Keine Formeln gefunden. Ändere deine Suche oder Filter.</div>'}</div></section>`;
}
function detail(id) {
  const f = byId(id);
  if (!f) return home();
  addRecent(id);
  const vars = f.variables
    .split(';')
    .map((v) => {
      const [name, ...rest] = v.split(':');
      return `<tr><td>${esc(name.trim())}</td><td>${esc(rest.join(':').trim())}</td></tr>`;
    })
    .join('');
  const related = all()
    .filter((x) => x.category === f.category && x.id !== f.id)
    .slice(0, 3);
  const rearrange = rearrangements(f);
  return `<section class="detail"><button class="button ghost back" data-back>← Zurück</button><div class="detail-hero"><span class="eyebrow">${esc(f.category)}</span><h1>${esc(f.name)}</h1>${math(f.latex)}<p>${esc(f.description)}</p><div class="card-actions"><button class="button" data-copy="${f.id}">Formel kopieren</button><button class="button ${state.favorites.has(f.id) ? 'primary' : ''}" data-favorite="${f.id}">${state.favorites.has(f.id) ? '★ Favorit' : '☆ Favorisieren'}</button>${state.editing ? `<button class="button" data-edit="${f.id}">Bearbeiten</button>` : ''}</div></div><div class="detail-sections"><article class="info-box"><h3>Variablen & Einheiten</h3><table>${vars}</table></article><article class="info-box"><h3>Typische Anwendung</h3><p>${esc(f.application || 'Keine Anwendung hinterlegt.')}</p></article>${f.example ? `<article class="info-box"><h3>Beispielrechnung</h3><p>${esc(f.example)}</p></article>` : ''}${rearrange ? `<article class="info-box"><h3>Formel umstellen</h3>${rearrange.map((x) => math(x)).join('')}</article>` : ''}</div>${cardsSection('Verwandte Formeln', related)}</section>`;
}
function rearrangements(f) {
  const map = {
    'F=ma': ['F=ma', 'm=\\frac{F}{a}', 'a=\\frac{F}{m}'],
    'p=mv': ['p=mv', 'm=\\frac{p}{v}', 'v=\\frac{p}{m}'],
    'U=RI': ['U=RI', 'R=\\frac{U}{I}', 'I=\\frac{U}{R}'],
    'P=UI': ['P=UI', 'U=\\frac{P}{I}', 'I=\\frac{P}{U}'],
    'I=\\frac{Q}{t}': ['I=\\frac{Q}{t}', 'Q=It', 't=\\frac{Q}{I}'],
    'v=\\lambda f': ['v=\\lambda f', '\\lambda=\\frac{v}{f}', 'f=\\frac{v}{\\lambda}'],
    'E_{kin}=\\frac12mv^2': [
      'E_{kin}=\\frac12mv^2',
      'm=\\frac{2E_{kin}}{v^2}',
      'v=\\sqrt{\\frac{2E_{kin}}{m}}',
    ],
  };
  return map[f.latex];
}
function favorites() {
  const fs = all().filter((f) => state.favorites.has(f.id));
  return `<section><div class="section-head"><div><h1 class="page-title">Favoriten</h1><p>Deine markierten Formeln.</p></div></div><div class="formula-grid">${fs.map(formulaCard).join('') || '<div class="empty">Noch keine Favoriten. Markiere Formeln mit dem Stern.</div>'}</div></section>`;
}
function mine() {
    const items = [...state.custom].sort((a, b) => {
      if (state.mineSort === 'popular') return b.used - a.used;
      if (state.mineSort === 'alpha') return a.name.localeCompare(b.name, 'de');
      if (state.mineSort === 'category') {
        return a.category.localeCompare(b.category, 'de') ||
          a.name.localeCompare(b.name, 'de');
      }
      if (state.mineSort === 'newest') return b.created - a.created;
      if (state.mineSort === 'favorites') {
        return Number(state.favorites.has(b.id)) - Number(state.favorites.has(a.id));
      }
      return b.created - a.created;
    });
  return `<section><div class="section-head"><div><h1 class="page-title">Meine Formeln</h1><p>Eigene Formeln verwalten und sichern.</p></div>${state.editing ? '<button class="button primary" onclick="openFormula()">+ Neue Formel</button>' : ''}</div>${!state.editing ? '<div class="empty">Aktiviere den Bearbeitungsmodus, um eigene Formeln anzulegen oder zu verändern.</div>' : ''}<div class="filters">${state.editing ? '<button class="button" data-export>Formeln exportieren</button><button class="button" data-import>Formeln importieren</button><button class="button" data-sort="popular">Häufig verwendet</button><button class="button" data-sort="recent">Zuletzt hinzugefügt</button>' : ''}</div><div class="formula-grid">${items.map(formulaCard).join('') || '<div class="empty">Noch keine eigenen Formeln angelegt.</div>'}</div></section>`;
}
function calculator() {
  return `<section><div class="section-head"><div><h1 class="page-title">Physik-Rechner</h1><p>Setze Werte ein und berechne einfache Standardformeln.</p></div></div><div class="calculator"><label>Formel auswählen<select id="calc-select">${calcOptions.map((o, i) => `<option value="${i}">${o[0]}</option>`).join('')}</select></label><div id="calc-area"></div></div></section>`;
}

const calcOptions = [
  // Energie und Mechanik
  ['Kinetische Energie', 'E_{kin}', 'm,v', '0.5*m*v*v', 'J'],
  ['Gewichtskraft', 'F_G', 'm,g', 'm*g', 'N'],
  ['Potenzielle Energie', 'E_{pot}', 'm,g,h', 'm*g*h', 'J'],
  ['Beschleunigung', 'a', 'v,v0,t', '(v-v0)/t', 'm/s^2'],
  ['Geschwindigkeit', 'v', 'v0,a,t', 'v0+a*t', 'm/s'],
  ['Weg bei konstanter Beschleunigung', 's', 'v0,t,a', 'v0*t+0.5*a*t*t', 'm'],
  ['Impuls', 'p', 'm,v', 'm*v', 'kg*m/s'],
  ['Kraft (Newton II)', 'F', 'm,a', 'm*a', 'N'],
  ['Zentripetalkraft', 'F_z', 'm,v,r', 'm*v*v/r', 'N'],
  ['Zentripetalbeschleunigung', 'a_z', 'v,r', 'v*v/r', 'm/s^2'],
  ['Reibungskraft', 'F_R', 'mu,F_N', 'mu*F_N', 'N'],
  ['Arbeit', 'W', 'F,s', 'F*s', 'J'],
  ['Leistung (Mechanik)', 'P', 'F,v', 'F*v', 'W'],
  ['Federkraft', 'F_F', 'k,x', '-k*x', 'N'],
  ['Federenergie', 'E_F', 'k,x', '0.5*k*x*x', 'J'],

  // Kreisbewegung und Gravitation
  ['Bahngeschwindigkeit', 'v', 'G,M,r', 'Math.sqrt(G*M/r)', 'm/s'],
  ['Umlaufzeit', 'T', 'r,v', '2*Math.PI*r/v', 's'],
  ['Gravitationskraft', 'F_G', 'G,m1,m2,r', 'G*m1*m2/(r*r)', 'N'],

  // Elektrizität
  ['Ohmsches Gesetz', 'U', 'R,I', 'R*I', 'V'],
  ['Elektrische Spannung', 'U', 'E_el,q', 'E_el/q', 'V'],
  ['Elektrischer Widerstand', 'R', 'U,I', 'U/I', 'Ohm'],
  ['Elektrische Leistung', 'P', 'U,I', 'U*I', 'W'],
  ['Elektrische Ladung', 'Q', 'I,t', 'I*t', 'C'],
  ['Elektrische Energie', 'E_el', 'U,I,t', 'U*I*t', 'J'],
  ['Reihenwiderstand', 'R_{ges}', 'R1,R2,R3', 'R1+R2+R3', 'Ohm'],
  ['Paralleler Widerstand', 'R_{ges}', 'R1,R2,R3', '1/(1/R1+1/R2+1/R3)', 'Ohm'],
  ['Coulomb-Kraft', 'F_C', 'k,q1,q2,r', 'k*q1*q2/(r*r)', 'N'],

  // Schwingungen und Wellen
  ['Wellenlänge', '\\lambda', 'v,f', 'v/f', 'm'],
  ['Frequenz', 'f', 'v,lambda', 'v/lambda', 'Hz'],
  ['Fadenpendel – Periodendauer', 'T', 'l,g', '2*Math.PI*Math.sqrt(l/g)', 's'],
  ['Federpendel – Periodendauer', 'T', 'm,k', '2*Math.PI*Math.sqrt(m/k)', 's'],

  // Wärmelehre
  ['Wärmemenge', 'Q', 'm,c,dT', 'm*c*dT', 'J'],
  ['Temperaturänderung', '\\Delta T', 'Q,m,c', 'Q/(m*c)', 'K'],
  ['Wärmekapazität', 'C', 'Q,dT', 'Q/dT', 'J/K'],

  // Wirkungsgrad
  ['Wirkungsgrad', '\\eta', 'E_nutz,E_zu', '100*E_nutz/E_zu', '%']
];

function calcArea() {
  const o = calcOptions[document.querySelector('#calc-select').value];
  document.querySelector('#calc-area').innerHTML = `<div class="calc-fields">${o[2]
    .split(',')
    .map(
      (v) =>
        `<label>${v}<input type="number" step="any" data-calc="${v}" placeholder="Wert eingeben"></label>`,
    )
    .join(
      '',
    )}</div><button class="button primary" id="calculate">Berechnen</button><div class="result" id="calc-result">Bereit für die Berechnung.</div>`;
}
function help() {
  return `<section class="help"><h1 class="page-title">Hilfe</h1><p class="muted">Kurz erklärt – alles funktioniert direkt im Browser.</p>${[
    [
      'Formeln suchen',
      'Die Suchleiste durchsucht Namen, Formeln, Beschreibungen, Kategorien, Variablen und Schlagwörter.',
    ],
    [
      'Kategorien & Favoriten',
      'Klicke ein Fachgebiet auf der Startseite. Ein Stern speichert eine Formel dauerhaft als Favorit in diesem Browser.',
    ],
    [
      'Eigene Formeln',
      'Aktiviere den Bearbeitungsmodus, öffne „Meine Formeln" und wähle „Neue Formel". Eigene Daten bleiben lokal gespeichert.',
    ],
    [
      'Bearbeitungsmodus',
      'Er schützt Bearbeitungsfunktionen lokal mit dem Passwort aus config.js. Er ist kein Login-System für öffentliche Websites.',
    ],
    [
      'Import & Export',
      'Unter „Meine Formeln" kannst du eigene Formeln als JSON sichern oder eine zuvor exportierte JSON-Datei wieder einlesen.',
    ],
  ]
    .map(([h, p]) => `<article class="info-box"><h3>${h}</h3><p>${p}</p></article>`)
    .join('')}</section>`;
}
function renderLatexText(text) {
  if (!text) return '';

  const t = String(text)
    .replace(/[＄﹩]/g, '$')
    .replace(/\\\$/g, '$');

  const tex = (latex, displayMode) => {
    try {
      if (!window.katex) throw new Error('katex fehlt');
      return katex.renderToString(latex.trim(), { throwOnError: false, displayMode });
    } catch {
      return esc(latex);
    }
  };

  return t
    .split(/(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)|\$[^$]+\$)/g)
    .map((p) => {
      if (!p) return '';
      if (p.startsWith('$$') && p.endsWith('$$') && p.length > 3) return tex(p.slice(2, -2), true);
      if (p.startsWith('\\[')) return tex(p.slice(2, -2), true);
      if (p.startsWith('\\(')) return tex(p.slice(2, -2), false);
      if (p.startsWith('$') && p.endsWith('$') && p.length > 1) return tex(p.slice(1, -1), false);
      return esc(p).replace(/\n/g, '<br>');
    })
    .join('');
}
function sortExerciseTasks(tasks) {
  return [...(tasks || [])].sort((a, b) => {
    const first = String(a.task_number ?? '').trim();
    const second = String(b.task_number ?? '').trim();

    const firstIsNumber = /^\d+(?:[.,]\d+)?$/.test(first);
    const secondIsNumber = /^\d+(?:[.,]\d+)?$/.test(second);

    if (firstIsNumber && secondIsNumber) {
      return Number(first.replace(',', '.')) -
        Number(second.replace(',', '.'));
    }

    return first.localeCompare(second, 'de', {
      numeric: true,
      sensitivity: 'base'
    });
  });
}
  function renderExerciseTasks(tasks) {
  const list = document.querySelector('.exercise-task-list');

  if (!list) return;
  const totalTasks = tasks ? tasks.length : 0;
  const correctTasks = Object.values(state.exerciseResults).filter(
    (result) => result === true
  ).length;

  const percentage = totalTasks
    ? Math.round((correctTasks / totalTasks) * 100)
    : 0;
  const progressHtml = `
    <div class="exercise-progress">
      <strong>${correctTasks} von ${totalTasks} richtig</strong>
      <span>${percentage} %</span>
    </div>
  `;
    list.innerHTML = progressHtml + (
    tasks && tasks.length
    ? tasks.map((task) => `
      <article class="exercise-task-card">
        <h2>Aufgabe ${esc(task.task_number)}${task.title ? ` – ${renderLatexText(task.title)}` : ''}</h2>

        <div class="exercise-task-left">
          <div class="exercise-question">
            ${renderLatexText(task.question)}
          </div>

          ${
            task.image_url
              ? `<img
                  src="${task.image_url}"
                  alt="Bild zur Aufgabe"
                  class="exercise-task-image"
                />`
              : ''
          }
        </div>

        <div class="exercise-solution" data-exercise-solution="${task.id}" hidden>
          <strong><h2>Lösungsweg</h2></strong>
          <div class="exercise-solution-content">
            ${renderLatexText(task.solution)}
          </div>
        </div>

        <div class="exercise-answer">
          <div class="exercise-target exercise-target-large">
            <span>Gesucht:</span>
            <span class="exercise-variable">
              ${task.variable ? katex.renderToString(task.variable, { throwOnError: false }) : ''}
            </span>
            <span class="exercise-operator">${{
              '=': '=',
              '>': '>',
              '<': '<',
              '<=': '≤',
              '>=': '≥',
              approx: '≈'
            }[task.operator || '=']}</span>
          </div>

          <label>
            Deine Antwort
            <div class="exercise-answer-input">
              <input
                type="text"
                data-exercise-answer="${task.id}"
                placeholder="z. B. 12,5 m/s"
              />
            </div>
          </label>

          <button class="button primary" data-exercise-check="${task.id}">
            Prüfen
          </button>

          ${
            state.editing
              ? `<button class="button" data-exercise-task-edit="${task.id}">
                  Bearbeiten
                </button>
                <button class="button danger" data-exercise-task-delete="${task.id}">
                  Löschen
                </button>`
              : ''
          }
        </div>

        <div data-exercise-feedback="${task.id}"></div>
      </article>
    `).join('')
    : '<p class="muted">Für diese LK wurden noch keine Aufgaben erstellt.</p>');
  }
  function updateExerciseProgress() {
    const progress = document.querySelector('.exercise-progress');

    if (!progress) return;

    const totalTasks =
      document.querySelectorAll('.exercise-task-card').length;

    const correctTasks = Object.values(state.exerciseResults).filter(
      (result) => result === true
    ).length;

    const percentage = totalTasks
      ? Math.round((correctTasks / totalTasks) * 100)
      : 0;

    progress.innerHTML = `
      <strong>${correctTasks} von ${totalTasks} richtig</strong>
      <span>${percentage} %</span>
    `;
  }
  async function loadExerciseLks() {
    let query = window.supabaseClient
      .from('exercise_lks')
      .select('*')
      .order('created_at', { ascending: false });

    if (!state.editing) {
      query = query.eq('hidden', false);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Fehler beim Laden der Übungs-LKs:', error);
      return;
    }

    const page = document.querySelector('.exercise-lks-page');
    if (!page) return;

    const list = page.querySelector('.exercise-lk-list');

    if (!list) return;

    if (!data || data.length === 0) {
      list.innerHTML = '';
      return;
    }

    list.innerHTML = data.map((lk) => `
      <article class="exercise-lk-card">
        <h2>${renderLatexText(lk.title)}</h2>
        <p class="muted">${renderLatexText(lk.description || '')}</p>
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <button class="button primary" data-exercise-open="${lk.id}">
              Öffnen
            </button>

            ${
              state.editing
                ? `<button class="button" data-exercise-lk-edit="${lk.id}">
                    Bearbeiten
                  </button>
                  <button class="button danger" data-exercise-lk-delete="${lk.id}">
                    Löschen
                  </button>
                  <button class="button" data-exercise-lk-toggle="${lk.id}">
                    ${lk.hidden ? 'Anzeigen' : 'Verstecken'}
                  </button>`
                : ''
            }
          </div>
      </article>
    `).join('');
  }
//Open
document.addEventListener('click', async (e) => {
  const b = e.target.closest('[data-exercise-open]');
  if (!b) return;

  const lkId = b.dataset.exerciseOpen;
  state.openExerciseLkId = lkId;
  document.querySelector('#formula-dialog')?.setAttribute(
    'data-exercise-lk-id',
    lkId
  );

  const { data: lk, error: lkError } = await window.supabaseClient
    .from('exercise_lks')
    .select('*')
    .eq('id', lkId)
    .single();

  if (lkError) {
    console.error('Fehler beim Laden der Übungs-LK:', lkError);
    alert('Die Übungs-LK konnte nicht geladen werden.');
    return;
  }

  const { data: tasks, error: taskError } = await window.supabaseClient
    .from('exercise_tasks')
    .select('*')
    .eq('lk_id', lkId)

  if (taskError) {
    console.error('Fehler beim Laden der Aufgaben:', taskError);
    alert('Die Aufgaben konnten nicht geladen werden.');
    return;
  }

  document.querySelector('#app').innerHTML = `
    <section class="exercise-detail-page">
      <button class="button" data-exercise-back>← Zurück</button>

      <h1>${renderLatexText(lk.title)}</h1>
      <p class="muted">${renderLatexText(lk.description || '')}</p>
      ${
        state.editing
          ? `<button class="button primary" data-exercise-task-new="${lk.id}">＋ Aufgabe hinzufügen</button>`
          : ''
      }
      <div class="exercise-task-list"></div>  
    </section>
  `;
  renderExerciseTasks(sortExerciseTasks(tasks));
});
//Check
document.addEventListener('click', async (e) => {
    const b = e.target.closest('[data-exercise-check]');
    if (!b) return;

    const taskId = b.dataset.exerciseCheck;

    const input = document.querySelector(
      `[data-exercise-answer="${taskId}"]`
    );

    const feedback = document.querySelector(
      `[data-exercise-feedback="${taskId}"]`
    );

    const userInput = input?.value.trim();
    input?.classList.remove(
      'exercise-answer-correct',
      'exercise-answer-wrong'
    );
    if (!userInput) {
      feedback.innerHTML = '<p class="muted">Bitte gib eine Antwort ein.</p>';
    return;
  }
  const match = userInput.match(/^(-?\d+(?:[.,]\d+)?)\s*(.*)$/);

  if (!match) {
    feedback.innerHTML =
      '<p class="muted">Bitte gib eine gültige Zahl ein, ggf. mit Einheit.</p>';
    return;
  }

  const userAnswer = Number(match[1].replace(',', '.'));
  const userUnit = match[2].trim();

  const { data: task, error } = await window.supabaseClient
    .from('exercise_tasks')
    .select('answer, tolerance, unit, operator')
    .eq('id', taskId)
    .single();

  if (error) {
    console.error('Fehler beim Prüfen der Aufgabe:', error);
    feedback.innerHTML = '<p class="muted">Die Antwort konnte nicht geprüft werden.</p>';
    return;
  }

const normalizeUnit = (unit) => {
  let u = (unit || '')
    .trim()
    .replace(/\s+/g, '')
    .replace(/·/g, '*');

  // Unicode-Hochzahlen
  const superscriptMap = {
    '⁰': '0',
    '¹': '1',
    '²': '2',
    '³': '3',
    '⁴': '4',
    '⁵': '5',
    '⁶': '6',
    '⁷': '7',
    '⁸': '8',
    '⁹': '9',
    '⁻': '-'
  };

  u = u.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+/g, (match) => {
    const normal = [...match]
      .map((char) => superscriptMap[char] || char)
      .join('');

    return `^${normal}`;
  });

  // Klammern entfernen
  u = u.replace(/[()]/g, '');
  // SI-Präfixe nicht von der Basiseinheit trennen
  u = u.replace(/([kMGTP])(?=Pa|Hz|Wb|N|J|W|A|K|C|V|T|m|s)/g, '$1');

  // Bekannte Einheiten – längere zuerst
  const units = [
    'mol',
    'cd',
    'kg',
    'Pa',
    'Hz',
    'Wb',
    'ohm',
    'N',
    'J',
    'W',
    'A',
    'K',
    'g',
    'm',
    's',
    'C',
    'V',
    'T',
    'L',
    'µ'
  ].sort((a, b) => b.length - a.length);

  const powers = {};

  const parseFactors = (text, sign) => {
    let i = 0;
    
    while (i < text.length) {
      if (text[i] === '*') {
        i++;
        continue;
      }

      let foundUnit = null;

      for (const candidate of units) {
        if (text.startsWith(candidate, i)) {
          foundUnit = candidate;
          break;
        }
      }

      // Falls keine Einheit direkt erkannt wurde: SI-Präfix prüfen
      if (!foundUnit) {
        const prefixes = [
          ['da', 1e1],
          ['k', 1e3],
          ['h', 1e2],
          ['M', 1e6],
          ['G', 1e9],
          ['d', 1e-1],
          ['c', 1e-2],
          ['m', 1e-3],
          ['µ', 1e-6],
          ['n', 1e-9],
          ['p', 1e-12]
        ];

        for (const [prefix] of prefixes) {
          if (!text.startsWith(prefix, i)) continue;

          const rest = text.slice(i + prefix.length);
          const baseUnit = units.find(candidate => rest.startsWith(candidate));

          if (baseUnit) {
            foundUnit = baseUnit;
            i += prefix.length;
            break;
          }
        }
      }

      if (!foundUnit) {
        return false;
      }

      i += foundUnit.length;

      let exponent = 1;

      if (text[i] === '^') {
        i++;

        const match = text.slice(i).match(/^-?\d+/);

        if (!match) {
          return false;
        }

        exponent = Number(match[0]);
        i += match[0].length;
      }

      powers[foundUnit] =
        (powers[foundUnit] || 0) + exponent * sign;
    }

    return true;
  };

  // Zähler und Nenner trennen
  const slashIndex = u.indexOf('/');

  if (slashIndex === -1) {
    if (!parseFactors(u, 1)) {
      return u;
    }
  } else {
    const numerator = u.slice(0, slashIndex);
    const denominator = u.slice(slashIndex + 1);

    // Zähler positiv
    if (!parseFactors(numerator, 1)) {
      return u;
    }

    // Alles im Nenner negativ
    if (!parseFactors(denominator, -1)) {
      return u;
    }
  }

  return Object.entries(powers)
    .filter(([, exponent]) => exponent !== 0)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([base, exponent]) =>
      exponent === 1
        ? base
        : `${base}^${exponent}`
    )
    .join('*');
};
const unitPrefixes = {
  Y: 1e24,
  Z: 1e21,
  E: 1e18,
  P: 1e15,
  T: 1e12,
  G: 1e9,
  M: 1e6,
  k: 1e3,
  h: 1e2,
  da: 1e1,
  d: 1e-1,
  c: 1e-2,
  m: 1e-3,
  µ: 1e-6,
  n: 1e-9,
  p: 1e-12,
  f: 1e-15
};

const baseUnits = [
  'mol',
  'cd',
  'kg',
  'A',
  'K',
  'm',
  's',
  'T'
];
const specialUnitFactors = {
  min: {
    dimensions: { s: 1 },
    factor: 60
  },

  h: {
    dimensions: { s: 1 },
    factor: 3600
  },

  d: {
    dimensions: { s: 1 },
    factor: 86400
  },

  g: {
    dimensions: { kg: 1 },
    factor: 0.001
  },

  L: {
    dimensions: { m: 3 },
    factor: 0.001
  },

  Pa: {
    dimensions: { kg:1, m: -1, s: -2},
    factor: 1
  },

  Hz: {
    dimensions: { s: -1 },
    factor: 1
  },

  N: {
    dimensions: { kg: 1, m: 1, s: -2 },
    factor: 1
  },

  J: {
    dimensions: { kg: 1, m: 2, s: -2 },
    factor: 1
  },

  W: {
    dimensions: { kg: 1, m: 2, s: -3 },
    factor: 1
  },

  C: {
    dimensions: { A: 1, s: 1 },
    factor: 1
  },

  V: {
    dimensions: { kg: 1, m: 2, A: -1, s: -3 },
    factor: 1
  },

  Ohm: {
    dimensions: { kg: 1, m: 2, A: -2, s: -3 },
    factor: 1
  },

  Wb: {
    dimensions: { kg: 1, m: 2, A: -1, s: -2 },
    factor: 1
  },

  bar: {
    dimensions: { kg: 1, m: -1, s: -2 },
    factor: 100000
  },
};
const parseUnitFactor = (factor) => {
  const specialUnit = specialUnitFactors[factor];

  if (specialUnit) {
    return {
      unit: specialUnit.unit,
      prefix: null,
      factor: specialUnit.factor,
      exponent: 1
    };
  }  
  const match = factor.match(/^([a-zA-ZµΩ]+)(?:\^(-?\d+))?$/);

  if (!match) {
    return null;
  }

  const symbol = match[1];
  const exponent = Number(match[2] ?? 1);

  // Direkte Basiseinheit
  const directUnit = baseUnits.find(
    (unit) => unit.toLowerCase() === symbol.toLowerCase()
  );

  if (directUnit) {
    return {
      unit: directUnit,
      prefix: null,
      factor: 1,
      exponent
    };
  }

  // Präfix + Basiseinheit
  const prefixes = Object.entries(unitPrefixes)
    .sort(([a], [b]) => b.length - a.length);

  for (const [prefix, multiplier] of prefixes) {
    if (!symbol.startsWith(prefix)) {
      continue;
    }

    const base = symbol.slice(prefix.length);

    const matchingUnit = baseUnits.find(
      (unit) => unit.toLowerCase() === base.toLowerCase()
    );

    if (!matchingUnit) {
      continue;
    }

    return {
      unit: matchingUnit,
      prefix,
      factor: multiplier,
      exponent
    };
  }

  return null;
};
const parseUnitExpression = (unit) => {
  let u = (unit || '')
    .trim()
    .replace(/·/g, '*')
    .replace(/\s+/g, '');

  if (!u) {
    return null;
  }

  // Unicode-Hochzahlen
  const superscriptMap = {
    '⁰': '0',
    '¹': '1',
    '²': '2',
    '³': '3',
    '⁴': '4',
    '⁵': '5',
    '⁶': '6',
    '⁷': '7',
    '⁸': '8',
    '⁹': '9',
    '⁻': '-'
  };

  u = u.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+/g, (match) => {
    const normal = [...match]
      .map((char) => superscriptMap[char] || char)
      .join('');

    return `^${normal}`;
  });

  // Klammern entfernen
  u = u.replace(/[()]/g, '');

  const slashParts = u.split('/');
  const factors = [];

  for (let partIndex = 0; partIndex < slashParts.length; partIndex++) {
    const part = slashParts[partIndex];

    if (!part) continue;

    const sign = partIndex === 0 ? 1 : -1;

    // * trennt Faktoren eindeutig
    const explicitFactors = part
      .split('*')
      .filter(Boolean);

    for (const factor of explicitFactors) {
      let rest = factor;

      while (rest.length > 0) {
        let found = false;

        /*
         * Wir probieren alle bekannten Basiseinheiten
         * und Präfixe aus und nehmen einen passenden
         * Anfang des Strings.
         */
        const candidates = [];

        // Normale Basiseinheiten
        for (const baseUnit of baseUnits) {
          candidates.push({
            symbol: baseUnit,
            prefix: null,
            factor: 1,
            dimensions: {
              [baseUnit]: 1
            }
          });
        }

        // Präfix + normale Basiseinheit
        for (const [prefix, multiplier] of Object.entries(unitPrefixes)) {
          for (const baseUnit of baseUnits) {
            candidates.push({
              symbol: prefix + baseUnit,
              prefix,
              factor: multiplier,
              dimensions: {
                [baseUnit]: 1
              }
            });
          }
        }

        // Sonder-Einheiten + Präfixe
        for (const [specialSymbol, specialUnit] of Object.entries(
          specialUnitFactors
        )) {
          // Sonder-Einheit ohne Präfix
          candidates.push({
            symbol: specialSymbol,
            prefix: null,
            factor: specialUnit.factor,
            dimensions: specialUnit.dimensions
          });

          // Sonder-Einheit mit Präfix
          for (const [prefix, multiplier] of Object.entries(unitPrefixes)) {
            candidates.push({
              symbol: prefix + specialSymbol,
              prefix,
              factor: multiplier * specialUnit.factor,
              dimensions: specialUnit.dimensions
            });
          }
        }

        // Direkte Basiseinheiten zuerst,
        // danach Präfix + Basiseinheit.
        // So wird z. B. "N" nicht als "n" + "..." interpretiert.
        candidates.sort((a, b) => {
          // Längere Einheit zuerst.
          // Dadurch wird z. B. "mm" als Millimeter
          // und nicht als m · m erkannt.
          if (b.symbol.length !== a.symbol.length) {
            return b.symbol.length - a.symbol.length;
          }

          // Bei gleicher Länge direkte Einheit bevorzugen.
          if (a.prefix === null && b.prefix !== null) {
            return -1;
          }

          if (a.prefix !== null && b.prefix === null) {
            return 1;
          }

          return 0;
        });
        for (const candidate of candidates) {
          if (!rest.startsWith(candidate.symbol)) {
            continue;
          }

          let consumed = candidate.symbol;
          let exponent = 1;

          // Exponent direkt hinter der Einheit
          const exponentMatch = rest
            .slice(consumed.length)
            .match(/^\^(-?\d+)/);

          if (exponentMatch) {
            exponent = Number(exponentMatch[1]);
            consumed += exponentMatch[0];
          }

          let firstEntry = true;

          for (const [baseUnit, baseExponent] of Object.entries(
            candidate.dimensions
          )) {
            factors.push({
              unit: baseUnit,
              prefix: candidate.prefix,
              factor: firstEntry ? candidate.factor : 1,
              exponent: exponent * sign,
              dimensionExponent: baseExponent
            });

            firstEntry = false;
          }

          rest = rest.slice(consumed.length);

          found = true;
          break;
        }

        if (!found) {
          return null;
        }
      }
    }
  }

  return factors;
};
const getUnitConversionFactor = (unitExpression) => {
  if (!unitExpression) return 1;
  const factors = parseUnitExpression(unitExpression);

  if (!factors) {
    return null;
  }

  let totalFactor = 1;

  for (const factor of factors) {
    totalFactor *= Math.pow(
      factor.factor,
      factor.exponent
    );
  }

  return totalFactor;
};
function getUnitDimension(unitExpression) {
  if (!unitExpression) return {};
  const parsed = parseUnitExpression(unitExpression);

  if (!parsed) {
    return null;
  }

  const dimensions = {};

  for (const factor of parsed) {
    const baseUnit = factor.unit;
    const exponent =
      (factor.dimensionExponent ?? 1) * factor.exponent;

    dimensions[baseUnit] =
      (dimensions[baseUnit] || 0) + exponent;
  }

  // Einheiten mit Exponent 0 entfernen
  for (const unit of Object.keys(dimensions)) {
    if (dimensions[unit] === 0) {
      delete dimensions[unit];
    }
  }

  return dimensions;
}
function areUnitsEquivalent(unitA, unitB) {
  const dimensionA = getUnitDimension(unitA);
  const dimensionB = getUnitDimension(unitB);

  if (!dimensionA || !dimensionB) {
    return false;
  }

  const unitsA = Object.keys(dimensionA).sort();
  const unitsB = Object.keys(dimensionB).sort();

  if (unitsA.length !== unitsB.length) {
    return false;
  }

  for (let i = 0; i < unitsA.length; i++) {
    const unit = unitsA[i];

    if (unit !== unitsB[i]) {
      return false;
    }

    if (dimensionA[unit] !== dimensionB[unit]) {
      return false;
    }
  }

  return true;
}
function convertUnitValue(value, unit) {
  const factor = getUnitConversionFactor(unit);

  if (factor === null || !Number.isFinite(factor)) {
    return null;
  }

  return value * factor;
}
function areAnswersEquivalent(
  userValue,
  userUnit,
  expectedValue,
  expectedUnit,
  tolerance = 0,
  acceptedUnits = []
) {
  const normalizedUserUnit = normalizeUnit(userUnit);

  // Haupt-Einheit + alle akzeptierten Alternativen
  const validUnits = [
    expectedUnit,
    ...(Array.isArray(acceptedUnits) ? acceptedUnits : [])
  ]
    .map(normalizeUnit)
    .filter(Boolean);

  // Prüfen, ob die eingegebene Einheit zu einer gültigen Einheit passt
  const matchingUnit = validUnits.find((validUnit) =>
    areUnitsEquivalent(
      normalizedUserUnit,
      validUnit
    )
  );

  if (!matchingUnit) {
    return false;
  }

  // Eingabe in die Basiseinheit umrechnen
  const convertedUserValue = convertUnitValue(
    userValue,
    normalizedUserUnit
  );

  // Erwarteten Wert mit der passenden gültigen Einheit umrechnen
  const convertedExpectedValue = convertUnitValue(
    expectedValue,
    matchingUnit
  );

  if (
    convertedUserValue === null ||
    convertedExpectedValue === null
  ) {
    return false;
  }

  // Toleranz anhand der erwarteten Einheit umrechnen
  const expectedFactor =
    getUnitConversionFactor(matchingUnit);

  if (
    expectedFactor === null ||
    !Number.isFinite(expectedFactor)
  ) {
    return false;
  }

  const convertedTolerance =
    Math.abs(tolerance) * expectedFactor;

  return (
    Math.abs(
      convertedUserValue - convertedExpectedValue
    ) <= convertedTolerance
  );
}

console.log("✅ Einheiten-Testfunktionen bereit");

const expectedUnit = task.unit || '';
const enteredUnit = userUnit;

const correctUnit = areUnitsEquivalent(enteredUnit, expectedUnit);

let correctNumber = false;
const tol = Math.abs(task.tolerance || 0);

if (correctUnit) {
  const convertedUserAnswer = convertUnitValue(userAnswer, enteredUnit);
  const convertedExpectedAnswer = convertUnitValue(task.answer, expectedUnit);

  if (convertedUserAnswer !== null && convertedExpectedAnswer !== null) {
    const expectedFactor = getUnitConversionFactor(expectedUnit) ?? 1;

    correctNumber =
      Math.abs(convertedUserAnswer - convertedExpectedAnswer) <= tol * expectedFactor;
  }
} else {
  // Einheit falsch: Zahl trotzdem roh gegen die erwartete Zahl prüfen,
  // damit die Rückmeldung "nur die Einheit stimmt nicht" möglich ist
  correctNumber = Math.abs(userAnswer - task.answer) <= tol;
}

const correct = correctUnit && correctNumber;

state.exerciseResults[taskId] = correct;
updateExerciseProgress();

if (correct) {
  input?.classList.add('exercise-answer-correct');

  feedback.innerHTML = `
    <div class="exercise-answer-feedback-correct">
      Richtig!
    </div>
  `;

  const solution = document.querySelector(
    `[data-exercise-solution="${taskId}"]`
  );

  if (solution) {
    solution.hidden = false;
  }
} else {
  input?.classList.add('exercise-answer-wrong');

  if (!correctNumber && !correctUnit) {
    feedback.innerHTML =
      '<p>Zahl und Einheit stimmen noch nicht.</p>';
  } else if (!correctNumber) {
    feedback.innerHTML =
      '<p>Die Zahl stimmt noch nicht.</p>';
  } else {
    feedback.innerHTML =
      '<p>Die Einheit stimmt noch nicht.</p>';
  }
}
});
//Back
document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-exercise-back]');
  if (!b) return;

  state.page = 'exercise-lks';
  render();
});
//New Task
document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-exercise-task-new]');
    if (!b) return;

      const dialog = document.querySelector('#formula-dialog');
      const lkId = b.dataset.exerciseTaskNew;
      dialog.dataset.exerciseLkId = lkId;

      dialog.innerHTML = `
      <div class="dialog-content">
        <div class="dialog-title">
          <div>
            <span class="eyebrow">ÜBUNGS-LK</span>
            <h2>Neue Aufgabe</h2>
          </div>
          <button class="button" data-close>×</button>
        </div>

        <label>
          Aufgabennummer
          <input id="exercise-task-number" type="text" placeholder="z. B. 1, a), b)" />
        </label>

        <label>
          Titel
          <input id="exercise-task-title" type="text" placeholder="z. B. Energieerhaltung" />
        </label>

        <label>
          Gesuchte Variable
          <input
            id="exercise-task-variable"
            type="text"
            placeholder="z. B. v_{\mathrm{Ende}}"
          />
        </label>

        <label>
          Operator
          <select id="exercise-task-operator">
            <option value="=">=</option>
            <option value=">">&gt;</option>
            <option value="<">&lt;</option>
            <option value="<=">&le;</option>
            <option value=">=">&ge;</option>
            <option value="approx">≈</option>
          </select>
        </label>

        <label>
          Aufgabenstellung
          <textarea id="exercise-task-question" rows="5" placeholder="Aufgabenstellung"></textarea>
        </label>

        <label>
          Bild zur Aufgabe
          <input
            id="exercise-task-image"
            type="file"
            accept="image/png,image/jpeg"
          />
          <small class="muted">Optional – PNG oder JPG</small>
        </label>

        <label>
          Antwort / Ergebnis
          <input id="exercise-task-answer" type="number" step="any" placeholder="z. B. 25" />
        </label>

        <label>
          Toleranz
          <input id="exercise-task-tolerance" type="number" step="any" value="0" placeholder="z. B. 0.5" />
        </label>

        <label>
          Einheit
          <input id="exercise-task-unit" type="text" placeholder="z. B. m/s" />
        </label>

        <label>
          Lösung
          <textarea id="exercise-task-solution" rows="6" placeholder="Lösungsweg / Erklärung"></textarea>
        </label>

        <div class="dialog-actions">
          <button class="button" data-close>Abbrechen</button>
          <button class="button primary" data-exercise-task-save>Speichern</button>
        </div>
      </div>
    `;

    dialog.showModal();
});
//Save
document.addEventListener('click', async (e) => {
    const b = e.target.closest('[data-exercise-task-save]');
    if (!b) return;

    const dialog = document.querySelector('#formula-dialog');
    const lkId = dialog.dataset.exerciseLkId;

    const taskNumber = document.querySelector('#exercise-task-number')?.value.trim() || '';
    const title = document.querySelector('#exercise-task-title')?.value.trim();
    const question = document.querySelector('#exercise-task-question')?.value.trim();
    const imageFile = document.querySelector('#exercise-task-image')?.files?.[0] || null;
    const variable = document.querySelector('#exercise-task-variable')?.value.trim();
    const operator = document.querySelector('#exercise-task-operator')?.value;
    const answer = Number(
      document.querySelector('#exercise-task-answer')?.value
    );
    const tolerance = Number(
      document.querySelector('#exercise-task-tolerance')?.value || 0
    );
    const unit = document.querySelector('#exercise-task-unit')?.value.trim();
    const solution = document.querySelector('#exercise-task-solution')?.value.trim();

    if (!taskNumber || !question) {
      alert('Bitte mindestens Aufgabennummer und Aufgabenstellung eingeben.');
      return;
    }
    if (!Number.isFinite(answer)) {
      alert('Bitte gib ein gültiges Ergebnis ein.');
      return;
    }

    b.disabled = true;
    b.textContent = 'Speichern...';

    let imageUrl = null;

    if (imageFile) {
      const fileExtension = imageFile.name.split('.').pop().toLowerCase();
      const fileName = `${crypto.randomUUID()}.${fileExtension}`;

      const { error: uploadError } = await window.supabaseClient
        .storage
        .from('exercise-images')
        .upload(fileName, imageFile);

        if (uploadError) {
          console.error('Fehler beim Hochladen des Bildes:', uploadError);
          alert(
            'Bild-Upload fehlgeschlagen:\n\n' +
            uploadError.message
          );
          return;
        }

      const { data: publicUrlData } = window.supabaseClient
        .storage
        .from('exercise-images')
        .getPublicUrl(fileName);

      imageUrl = publicUrlData.publicUrl;
    }

    const { error } = await window.supabaseClient
      .from('exercise_tasks')
      .insert({
        lk_id: lkId,
        task_number: taskNumber,
        title: title || null,
        question,
        answer,
        tolerance,
        unit: unit || null,
        solution: solution || '',
        image_url: imageUrl,
        variable: variable || null,
        operator: operator || '=',
      });

    if (error) {
      console.error(error);
      alert('Fehler beim Speichern: ' + error.message);
      b.disabled = false;
      b.textContent = 'Speichern';
      return;
    }

    dialog.close();

    alert('Aufgabe wurde gespeichert.');
});
//Edit
document.addEventListener('click', async (e) => {
  const b = e.target.closest('[data-exercise-task-edit]');
  if (!b) return;

  const taskId = b.dataset.exerciseTaskEdit;

  const { data: task, error } = await window.supabaseClient
    .from('exercise_tasks')
    .select('*')
    .eq('id', taskId)
    .single();

  if (error) {
    console.error('Fehler beim Laden der Aufgabe:', error);
    alert('Die Aufgabe konnte nicht geladen werden.');
    return;
  }

  const dialog = document.querySelector('#formula-dialog');

  dialog.innerHTML = `
    <div class="dialog-content">
      <div class="dialog-title">
        <div>
          <span class="eyebrow">ÜBUNGS-LK</span>
          <h2>Aufgabe bearbeiten</h2>
        </div>
        <button class="button" data-close>×</button>
      </div>

      <label>
        Aufgabennummer
        <input
          id="exercise-task-number"
          type="text"
          value="${task.task_number ?? ''}"
        />
      </label>

      <label>
        Titel
        <input
          id="exercise-task-title"
          type="text"
          value="${task.title ?? ''}"
        />
      </label>

      <label>
        Gesuchte Variable
        <input
          id="exercise-task-variable"
          type="text"
          value="${task.variable ?? ''}"
        />
      </label>

      <label>
        Operator
        <select id="exercise-task-operator">
          <option value="=" ${task.operator === '=' ? 'selected' : ''}>=</option>
          <option value=">" ${task.operator === '>' ? 'selected' : ''}>&gt;</option>
          <option value="<" ${task.operator === '<' ? 'selected' : ''}>&lt;</option>
          <option value="<=" ${task.operator === '<=' ? 'selected' : ''}>&le;</option>
          <option value=">=" ${task.operator === '>=' ? 'selected' : ''}>&ge;</option>
          <option value="approx" ${task.operator === 'approx' ? 'selected' : ''}>≈</option>
        </select>
      </label>

      <label>
        Aufgabenstellung
        <textarea
          id="exercise-task-question"
          rows="5"
        >${task.question ?? ''}</textarea>
      </label>

      <label>
        Richtige Antwort
        <input
          id="exercise-task-answer"
          type="number"
          step="any"
          value="${task.answer ?? ''}"
        />
      </label>

      <label>
        Toleranz
        <input
          id="exercise-task-tolerance"
          type="number"
          step="any"
          value="${task.tolerance ?? 0}"
        />
      </label>

      <label>
        Einheit
        <input
          id="exercise-task-unit"
          type="text"
          value="${task.unit ?? ''}"
        />
      </label>

      
      <div class="exercise-image-editor">
        <label>
          Bild zur Aufgabe
          <input
            id="exercise-task-image"
            type="file"
            accept="image/png,image/jpeg"
          />
          <small class="muted">Optional – PNG oder JPG</small>
        </label>

        ${
          task.image_url
            ? `
              <div>
                <img
                  src="${task.image_url}"
                  alt="Aktuelles Aufgabenbild"
                  style="max-width: 100%; max-height: 250px; object-fit: contain;"
                />

                <div style="display: flex; align-items: center; gap: 8px;">
                  <input
                    id="exercise-task-remove-image"
                    type="checkbox"
                    style="margin: 0; flex-shrink: 0;"
                  />
                  <label for="exercise-task-remove-image" style="margin: 0;">
                    Vorhandenes Bild löschen
                  </label>
                </div>
              </div>
            `
            : '<p class="muted">Noch kein Bild vorhanden.</p>'
        }
      </div>

      <label>
        Lösungsweg
        <textarea
          id="exercise-task-solution"
          rows="7"
        >${task.solution ?? ''}</textarea>
      </label>

      <div class="dialog-actions">
        <button class="button" data-close>Abbrechen</button>
        <button class="button primary" data-exercise-task-update="${task.id}">
          Änderungen speichern
        </button>
      </div>
    </div>
  `;

  dialog.showModal();
});
//Update
document.addEventListener('click', async (e) => {
  const b = e.target.closest('[data-exercise-task-update]');
  if (!b) return;

  const taskId = b.dataset.exerciseTaskUpdate;
  const dialog = document.querySelector('#formula-dialog');
  const imageFile =
    document.querySelector('#exercise-task-image')?.files?.[0] || null;

  const removeImage =
    document.querySelector('#exercise-task-remove-image')?.checked || false;

  const taskNumber = document.querySelector('#exercise-task-number')?.value.trim() || '';
  const title = document.querySelector('#exercise-task-title')?.value.trim();
  const question = document.querySelector('#exercise-task-question')?.value.trim();
  const variable = document.querySelector('#exercise-task-variable')?.value.trim();
  const operator = document.querySelector('#exercise-task-operator')?.value;
  const answer = Number(
    document.querySelector('#exercise-task-answer')?.value
  );
  const tolerance = Number(
    document.querySelector('#exercise-task-tolerance')?.value || 0
  );
  const unit = document.querySelector('#exercise-task-unit')?.value.trim();
  const solution = document.querySelector('#exercise-task-solution')?.value.trim();

  if (!taskNumber || !question) {
    alert('Bitte mindestens Aufgabennummer und Aufgabenstellung eingeben.');
    return;
  }

  if (!Number.isFinite(answer)) {
    alert('Bitte gib ein gültiges Ergebnis ein.');
    return;
  }

    b.disabled = true;
  b.textContent = 'Speichern...';

  // Bisheriges Bild aus der Datenbank laden
  const {
    data: currentTask,
    error: currentTaskError
  } = await window.supabaseClient
    .from('exercise_tasks')
    .select('image_url')
    .eq('id', taskId)
    .single();

  if (currentTaskError) {
    console.error('Fehler beim Laden des bisherigen Bildes:', currentTaskError);
    alert('Das bisherige Bild konnte nicht geladen werden.');
    b.disabled = false;
    b.textContent = 'Änderungen speichern';
    return;
  }

  const oldImageUrl = currentTask.image_url || null;
  let imageUrl = oldImageUrl;
  let newImagePath = null;

  // Neues Bild hochladen (hat Vorrang vor "Bild löschen")
  if (imageFile) {
    const extension = imageFile.name.split('.').pop().toLowerCase();
    newImagePath = `${crypto.randomUUID()}.${extension}`;

    const { error: uploadError } = await window.supabaseClient
      .storage
      .from('exercise-images')
      .upload(newImagePath, imageFile);

    if (uploadError) {
      console.error('Fehler beim Hochladen des Bildes:', uploadError);
      alert('Das Bild konnte nicht hochgeladen werden: ' + uploadError.message);
      b.disabled = false;
      b.textContent = 'Änderungen speichern';
      return;
    }

    const { data: publicUrlData } = window.supabaseClient
      .storage
      .from('exercise-images')
      .getPublicUrl(newImagePath);

    imageUrl = publicUrlData.publicUrl;
  } else if (removeImage) {
    imageUrl = null;
  }

  const { error } = await window.supabaseClient
    .from('exercise_tasks')
    .update({
      task_number: taskNumber,
      title: title || null,
      question,
      variable: variable || null,
      operator: operator || '=',
      answer,
      tolerance,
      unit: unit || null,
      solution: solution || '',
      image_url: imageUrl,
    })
    .eq('id', taskId);

  if (error) {
    console.error('Fehler beim Aktualisieren der Aufgabe:', error);

    // Falls das neue Bild bereits hochgeladen wurde, wieder entfernen
    if (newImagePath) {
      await window.supabaseClient
        .storage
        .from('exercise-images')
        .remove([newImagePath]);
    }

    alert('Fehler beim Speichern: ' + error.message);
    b.disabled = false;
    b.textContent = 'Änderungen speichern';
    return;
  }

  // Altes Bild erst nach erfolgreichem Speichern entfernen
  if (oldImageUrl && oldImageUrl !== imageUrl) {
    const marker = '/storage/v1/object/public/exercise-images/';
    const markerIndex = oldImageUrl.indexOf(marker);

    // Nur Bilder aus unserem eigenen Bucket löschen
    if (markerIndex !== -1) {
      const oldImagePath = decodeURIComponent(
        oldImageUrl.slice(markerIndex + marker.length)
      );

      const { error: removeError } = await window.supabaseClient
        .storage
        .from('exercise-images')
        .remove([oldImagePath]);

      if (removeError) {
        console.warn('Altes Bild konnte nicht entfernt werden:', removeError);
      }
    }
  }

  dialog?.close();

  alert('Aufgabe wurde aktualisiert.');
  const lkId = state.openExerciseLkId;

if (lkId) {
  const { data: tasks, error } = await window.supabaseClient
    .from('exercise_tasks')
    .select('*')
    .eq('lk_id', lkId)

  if (error) {
    console.error('Fehler beim Neuladen der Aufgaben:', error);
    return;
  }

  renderExerciseTasks(sortExerciseTasks(tasks));
}

});
//Delete
document.addEventListener('click', async (e) => {
  const b = e.target.closest('[data-exercise-task-delete]');
  if (!b) return;

  const taskId = b.dataset.exerciseTaskDelete;

  const confirmed = confirm(
    'Möchtest du diese Aufgabe wirklich löschen?'
  );

  if (!confirmed) return;

  b.disabled = true;
  b.textContent = 'Löschen...';

  const { error } = await window.supabaseClient
    .from('exercise_tasks')
    .delete()
    .eq('id', taskId);

  if (error) {
    console.error('Fehler beim Löschen der Aufgabe:', error);
    alert('Fehler beim Löschen: ' + error.message);
    b.disabled = false;
    b.textContent = 'Löschen';
    return;
  }

  alert('Aufgabe wurde gelöscht.');

const lkId = state.openExerciseLkId;
console.log('Übungs-LK-ID nach Update:', lkId);

if (lkId) {
  const { data: tasks, error } = await window.supabaseClient
    .from('exercise_tasks')
    .select('*')
    .eq('lk_id', lkId)

  if (!error) {
    renderExerciseTasks(sortExerciseTasks(tasks));
    }
  }
}
);
//Toggle
document.addEventListener('click', async (e) => {
  const b = e.target.closest('[data-exercise-lk-toggle]');
  if (!b) return;

  const lkId = b.dataset.exerciseLkToggle;

  const { data: lk, error: loadError } = await window.supabaseClient
    .from('exercise_lks')
    .select('hidden')
    .eq('id', lkId)
    .single();

  if (loadError) {
    console.error('Fehler beim Laden des Sichtbarkeitsstatus:', loadError);
    alert('Der Sichtbarkeitsstatus konnte nicht geladen werden.');
    return;
  }

  const { error } = await window.supabaseClient
    .from('exercise_lks')
    .update({
      hidden: !lk.hidden
    })
    .eq('id', lkId);

  if (error) {
    console.error('Fehler beim Ändern der Sichtbarkeit:', error);
    alert('Die Sichtbarkeit konnte nicht geändert werden.');
    return;
  }

  await loadExerciseLks();
});
//Edit
document.addEventListener('click', async (e) => {
  const b = e.target.closest('[data-exercise-lk-edit]');
  if (!b) return;

  const lkId = b.dataset.exerciseLkEdit;

  const { data: lk, error } = await window.supabaseClient
    .from('exercise_lks')
    .select('*')
    .eq('id', lkId)
    .single();

  if (error) {
    console.error('Fehler beim Laden der Übungs-LK:', error);
    alert('Die Übungs-LK konnte nicht geladen werden.');
    return;
  }

  const dialog = document.querySelector('#formula-dialog');

  dialog.innerHTML = `
    <div class="dialog-content">
      <div class="dialog-title">
        <div>
          <span class="eyebrow">ÜBUNGS-LK</span>
          <h2>Übungs-LK bearbeiten</h2>
        </div>
        <button class="button" data-close>×</button>
      </div>

      <label>
        Titel
        <input
          id="exercise-lk-title"
          type="text"
          value="${lk.title ?? ''}"
        />
      </label>

      <label>
        Beschreibung
        <textarea
          id="exercise-lk-description"
          rows="5"
        >${lk.description ?? ''}</textarea>
      </label>

      <div class="dialog-actions">
        <button class="button" data-close>Abbrechen</button>
        <button class="button primary" data-exercise-lk-update="${lk.id}">
          Änderungen speichern
        </button>
      </div>
    </div>
  `;

  dialog.showModal();
});
// Update
document.addEventListener('click', async (e) => {
  const b = e.target.closest('[data-exercise-lk-update]');
  if (!b) return;

  const lkId = b.dataset.exerciseLkUpdate;
  const dialog = document.querySelector('#formula-dialog');

  const title = document
    .querySelector('#exercise-lk-title')
    ?.value.trim();

  const description = document
    .querySelector('#exercise-lk-description')
    ?.value.trim();

  if (!title) {
    alert('Bitte gib einen Titel ein.');
    return;
  }

  b.disabled = true;
  b.textContent = 'Speichern...';

  const { error } = await window.supabaseClient
    .from('exercise_lks')
    .update({
      title,
      description: description || null,
    })
    .eq('id', lkId);

  if (error) {
    console.error('Fehler beim Aktualisieren der Übungs-LK:', error);
    alert('Fehler beim Speichern: ' + error.message);
    b.disabled = false;
    b.textContent = 'Änderungen speichern';
    return;
  }

  dialog?.close();

  alert('Übungs-LK wurde aktualisiert.');

  await loadExerciseLks();
});
// Delete
document.addEventListener('click', async (e) => {
  const b = e.target.closest('[data-exercise-lk-delete]');
  if (!b) return;

  const lkId = b.dataset.exerciseLkDelete;

  const confirmed = confirm(
    'Möchtest du diese Übungs-LK wirklich löschen? Alle zugehörigen Aufgaben werden ebenfalls gelöscht.'
  );

  if (!confirmed) return;

  b.disabled = true;
  b.textContent = 'Löschen...';

  const { error } = await window.supabaseClient
    .from('exercise_lks')
    .delete()
    .eq('id', lkId);

  if (error) {
    console.error('Fehler beim Löschen der Übungs-LK:', error);
    alert('Fehler beim Löschen: ' + error.message);
    b.disabled = false;
    b.textContent = 'Löschen';
    return;
  }

  alert('Übungs-LK wurde gelöscht.');

  await loadExerciseLks();
});
function render() {
  nav();
  let content =
    state.page === 'home'
      ? home()
      : state.page === 'favorites'
        ? favorites()
        : state.page === 'mine'
          ? mine()
          : state.page === 'calculator'
            ? calculator()
            : state.page === 'help'
              ? help()
                : state.page === 'exercise-lks'
                  ? `<section class="exercise-lks-page">
                      <div style="display:flex; justify-content:space-between; align-items:center; gap:20px;">
                        <div>
                          <h1>Übungs-LKs</h1>
                          <p class="muted">Hier findest du die Übungs-LKs.</p>
                        </div>
                        ${
                          state.editing
                            ? '<button class="button primary" data-exercise-new>＋ Neue Übungs-LK</button>'
                            : ''
                        }
                      </div>

                      <div class="exercise-lk-list"></div>
                    </section>`
                : state.page === 'detail'
                  ? detail(state.detailId)
                  : listing(state.category || 'Formeln');
  document.querySelector('#app').innerHTML = content;

  if (state.page === 'calculator') calcArea();

  if (state.page === 'exercise-lks') {
    loadExerciseLks();
  }
}
function addRecent(id) {
  state.recent = [id, ...state.recent.filter((x) => x !== id)].slice(0, 8);
  save();
}
function openFormula(f) {
  const d = document.querySelector('#formula-dialog');
  const isNew = !f;
  d.innerHTML = `<div class="dialog-content"><div class="dialog-title"><h2>${isNew ? 'Neue Formel' : 'Formel bearbeiten'}</h2><button class="button" data-close>×</button></div><form id="formula-form"><div class="form-grid"><label>Name<input required name="name" value="${esc(f?.name)}"></label><label>Kategorie<select name="category">${CATEGORIES.map((c) => `<option ${f?.category === c ? 'selected' : ''}>${c}</option>`).join('')}</select></label></div><label>Formel (LaTex)<input required name="latex" value="${esc(f?.latex)}" placeholder="E_{kin}=\\frac12mv^2"></label><label>Beschreibung<textarea required name="description">${esc(f?.description)}</textarea></label><label>Variablen & Einheiten <span class="muted">(durch Semikolon trennen)</span><textarea name="variables">${esc(f?.variables)}</textarea></label><div class="form-grid"><label>Anwendung<input name="application" value="${esc(f?.application)}"></label><label>Tags <span class="muted">(durch Komma trennen)</span><input name="tags" value="${esc(f?.tags?.join(', '))}"></label></div><label>Beispielrechnung<textarea name="example">${esc(f?.example)}</textarea></label><div class="dialog-actions"><button type="button" class="button" data-close>Abbrechen</button><button class="button primary">Speichern</button></div></form></div>`;
  d.showModal();
  d.querySelector('form').onsubmit = async (e) => {
  e.preventDefault();

  if (!(await checkAdmin())) {
    toast('Admin-Anmeldung erforderlich.');
    return;
  }

  const x = Object.fromEntries(new FormData(e.target));

  const payload = {
    title: x.name,
    category: x.category,
    formula: x.latex,
    explanation: x.description,
    variables: x.variables,
    application: x.application,
    source_id: f?.sourceId || `custom-${crypto.randomUUID()}`,
    tags: x.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean),
    example: x.example,
  };

  let data;
  let error;

  if (f?.dbId) {
    ({ data, error } = await supabaseClient
      .from('formulas')
      .update(payload)
      .eq('id', f.dbId)
      .select()
      .single());
  } else {
    ({ data, error } = await supabaseClient
      .from('formulas')
      .insert(payload)
      .select()
      .single());
  }

  if (error) {
    console.error('Supabase Fehler:', error);
    toast('Speichern fehlgeschlagen.');
    return;
  }

  const updated = mapRemoteFormula(data);

  if (f?.dbId) {
    state.custom = state.custom.map((q) =>
      q.id === f.id ? updated : q
    );
  } else {
    state.custom.push(updated);
  }

  d.close();
  toast('Formel gespeichert.');
  render();
};
}
document.addEventListener('click', async (e) => {
  const b = e.target.closest(
    '[data-nav],[data-category],[data-detail],[data-favorite],[data-copy],[data-edit],[data-delete],[data-new],[data-export],[data-import],[data-sort],[data-back],[data-close],#mode,#calculate',
  );
  if (!b) return;
  if (b.dataset.nav) {
    state.page = b.dataset.nav;
    state.category = '';
    state.query = '';
    render();
  } else if (b.dataset.category) {
    state.category = b.dataset.category;
    state.page = 'list';
    render();
  } else if (b.dataset.detail) {
    state.detailId = b.dataset.detail;
    state.page = 'detail';
    render();
  } else if (b.dataset.favorite) {
    const id = b.dataset.favorite;
    state.favorites.has(id) ? state.favorites.delete(id) : state.favorites.add(id);
    save();
    render();
  } else if (b.dataset.copy) {
    const f = byId(b.dataset.copy);
    navigator.clipboard?.writeText(f.latex);
    toast('LaTex-Formel kopiert.');
  } else if (b.dataset.edit) {
    openFormula(byId(b.dataset.edit));
  } else if (b.dataset.delete) {
  if (!confirm('Diese Formel wirklich löschen?')) return;

  const formula = byId(b.dataset.delete);

  if (!formula) return;

  if (!(await checkAdmin())) {
    toast('Admin-Login erforderlich.');
    return;
  }
  if (formula.sourceId && !formula.dbId) {
    const { error } = await supabaseClient
      .from('deleted_formulas')
      .insert({
        source_id: formula.sourceId,
      });

    if (error) {
      console.error('Löschmarkierung fehlgeschlagen:', error);
      toast('Formel konnte nicht als gelöscht markiert werden.');
      return;
    }

    state.deletedSourceIds.add(formula.sourceId);
  }
  if (formula.dbId) {
    const { error } = await supabaseClient
      .from('formulas')
      .delete()
      .eq('id', formula.dbId);

    if (error) {
      console.error('Löschen fehlgeschlagen:', error);
      toast('Formel konnte nicht gelöscht werden.');
      return;
    }

    state.custom = state.custom.filter(
      (f) => f.dbId !== formula.dbId
    );
  } else {
    state.custom = state.custom.filter(
      (f) => f.id !== b.dataset.delete
    );
  }

  state.favorites.delete(b.dataset.delete);
  save();
  render();
  toast('Formel gelöscht.');
  } else if (b.dataset.new) openFormula();

    else if (b.hasAttribute('data-sort')) {
      if (state.page === 'mine') {
        state.mineSort = b.dataset.sort;
      } else {
        state.listSort = b.dataset.sort;
      }
      render();

    } else if (b.hasAttribute('data-export')) {

      const blob = new Blob([JSON.stringify(state.custom, null, 2)], { type: 'application/json' });

      const a = document.createElement('a');

      a.href = URL.createObjectURL(blob);

      a.download = 'meine-physik-formeln.json';

      document.body.appendChild(a);

      a.click();

      a.remove();

      setTimeout(() => URL.revokeObjectURL(a.href), 0);

} else if (b.hasAttribute('data-import')) {
  document.querySelector('#import-file').click();

} else if (b.dataset.back) {
  state.page = state.category ? 'list' : 'home';
  render();
  } else if (b.dataset.close) document.querySelector('#formula-dialog').close();
  else if (b.id === 'mode') {
  if (state.editing) {
    state.editing = false;
    render();
  } else {
    if (!(await checkAdmin())) {
      const loggedIn = await loginAdmin();
      if (!loggedIn) return;
    }

    state.editing = true;
    toast('Bearbeitungsmodus aktiviert.');
    render();
    }
  } else if (b.id === 'calculate') {
    const s = document.querySelector('#calc-select').value;
    const opts = calcOptions[s];
    const v = {};
    document.querySelectorAll('[data-calc]').forEach((x) => (v[x.dataset.calc] = Number(x.value)));
    if (
      Object.values(v).some(Number.isNaN) ||
      Object.values(v).some((x) => x === 0 && document.querySelector(`[data-calc]`).value === '')
    )
      return toast('Bitte alle Werte eingeben.');
    const result = Function(...Object.keys(v), `return ${opts[3]}`)(...Object.values(v));
    const resultElement = document.querySelector('#calc-result');

    resultElement.innerHTML = `
      <div class="calc-result-formula">
        \\(${opts[1]} = ${Number(result.toFixed(6))}\\,\\mathrm{${opts[4]}}\\)
      </div>
    `;

    if (window.renderMathInElement) {
      renderMathInElement(resultElement, {
        delimiters: [
          { left: '\\(', right: '\\)', display: false },
          { left: '\\[', right: '\\]', display: true }
        ],
        throwOnError: false
      });
    }
  }
});
document.addEventListener('input', (e) => {
  if (e.target.id === 'global-search') {
    state.query = e.target.value;

    if (state.page === 'home') {
      state.page = 'list';
      state.category = '';
      render();

      requestAnimationFrame(() => {
        const input = document.querySelector('#global-search');
        if (input) {
          input.focus();
          input.setSelectionRange(input.value.length, input.value.length);
        }
      });
    } else {
      const grid = document.querySelector('.formula-grid');

      if (grid) {
        grid.innerHTML =
          filtered().map(formulaCard).join('') ||
          '<div class="empty">Keine Formeln gefunden. Ändere deine Suche oder Filter.</div>';
      }

      e.target.focus();
      e.target.setSelectionRange(e.target.value.length, e.target.value.length);
    }
  }
});
document.addEventListener('change', (e) => {
  if (e.target.id === 'category-filter') {
    state.category = e.target.value;
    render();
  }
  if (e.target.id === 'calc-select') calcArea();
});
document.querySelector('#import-file').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const x = JSON.parse(await file.text());
      if (!Array.isArray(x)) throw Error();

      let imported = 0;
      let updated = 0;

      for (const f of x) {
        const data = {
          title: f.name || f.title || 'Unbenannte Formel',
          category: f.category || '',
          formula: f.latex || f.formula || '',
          explanation: f.description || f.explanation || '',
          example: f.example || '',
          variables: f.variables || '',
          application: f.application || '',
          tags: Array.isArray(f.tags) ? f.tags : [],
        };

        let existing = null;

        if (f.sourceId) {
          const { data: bySource } = await supabaseClient
            .from('formulas')
            .select('*')
            .eq('source_id', f.sourceId)
            .maybeSingle();

          existing = bySource;
        }

        if (!existing) {
          const { data: byContent } = await supabaseClient
            .from('formulas')
            .select('*')
            .eq('title', data.title)
            .eq('formula', data.formula)
            .eq('category', data.category)
            .limit(1);

          existing = byContent?.[0] || null;
        }

        if (existing) {
          const { data: updatedRow, error } = await supabaseClient
            .from('formulas')
            .update(data)
            .eq('id', existing.id)
            .select()
            .single();

          if (error) throw error;

          state.custom = state.custom.filter((item) => item.dbId !== existing.id);
          state.custom.push(mapRemoteFormula(updatedRow));
          updated++;
        } else {
          const insertData = {
            ...data,
            source_id: f.sourceId || null,
          };

          const { data: insertedRow, error } = await supabaseClient
            .from('formulas')
            .insert(insertData)
            .select()
            .single();

          if (error) throw error;

          state.custom.push(mapRemoteFormula(insertedRow));
          imported++;
        }
      }

      toast(`${imported} Formeln importiert, ${updated} Formeln aktualisiert.`);
      render();
    } catch (error) {
      console.error(error);
      toast('Die Datei konnte nicht importiert werden.');
    }

    e.target.value = '';
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.activeElement?.id === 'global-search') {
    state.query = '';
    state.page = 'home';
    render();
  }
});
async function init() {
  await loadDeletedFormulas();
  await loadRemoteFormulas();
  render();
}

init();