/*
 * AI Landscape: site data
 * ----------------------------
 * Edit this file to change what the site shows. You do not need a build step.
 * index.html loads this file with a <script> tag, so the site also works when you open index.html from a folder.
 * Everything after "window.TAXONOMY_DATA =" is plain JSON. Keep the double quotes and do not add a comma after the last item in a list.
 *
 * Write each company as one short string in a "companies" list:
 *
 *   "Nvidia"                          plain name
 *   "Etched@etched-ai"                @slug is the LinkedIn page linkedin.com/company/etched-ai
 *   "Google TPU~Google"               ~Parent marks a product of a bigger company (links to the parent's page)
 *   "Speak?Speak language app"        ?keyword is the LinkedIn search text when there is no confirmed page
 *   "Abridge#Healthcare,Insurance"    #tags are the industries (L11 only). The default is Horizontal.
 *
 * You can combine the parts in any order after the name, for example "Rufus~Amazon#Retail".
 *
 * LinkedIn link rule: an explicit @slug wins. Otherwise, a name (or parent) in "slugs" gets that page.
 * A value in "slugs" can also be a full link, such as a LinkedIn showcase page or the company website.
 * Any other name opens a LinkedIn company search for that name.
 *
 * Profiles: "profiles" maps a company name (exactly as written in a companies list) to { "desc": one plain sentence, "web": website }.
 *   Bucket pages show the description and a Website link. A company without a profile still shows, without a description.
 *
 * Bucket fields: code, name, desc, companies, concepts (techniques or types that belong here but are not companies; shown as "Also covers"), children (sub-buckets).
 * Applications layer only: code is a short slug used in the address (for example "customer-support"), label is the small word
 * above an archetype name (for example "Act"), seeAlso links to related buckets, and was / wasAlso hold old codes so old links still work.
 * Links in the overview: write [words](https://address) or [words](#/L1) for a link to a layer.
 * Top-level fields: title, author (shown on the home page), asOf (the date shown), overview, mece, industries, slugs, layers, filterTags, rules.
 * Layer fields: id, name, hue (colour group: peach, lilac, mint, sky or rose), tagline, definition (a short plain-English paragraph), test, buckets. Set "isApps": true on the applications layer.
 */
window.TAXONOMY_DATA = {
  "title": "AI Landscape",
  "asOf": "Oct 21, 2026",
  "author": "Animesh",
  "overview": "AI (Artificial Intelligence, or \"genius\", as [President Trump would prefer to call it](https://www.rawstory.com/trump-ai-2673714476/)) is built in layers, like a building. This map sorts the AI industry into 11 layers. Layers [L1](#/L1) to [L10](#/L10) are the enabling stack: the power, chips, clouds, data, models and tools that people use to build AI. Each product goes in the layer that matches what it gives to builders. Layer [L11](#/L11) holds the applications that people use to get work done, sorted by the main job the AI does for them.",
  "mece": "Industry, modality, customer and pricing are filter tags, not buckets. That keeps the taxonomy MECE (Mutually Exclusive, Collectively Exhaustive): every product has exactly one home, and you filter within a bucket to analyse a slice of the market.",
  "industries": [
    "Horizontal",
    "Legal",
    "Healthcare",
    "Finance",
    "Insurance",
    "Education",
    "Retail",
    "Manufacturing",
    "Media",
    "Government",
    "Science"
  ],
  "slugs": {
    "01.AI": "01-ai",
    "11x": "11x-ai",
    "1X": "1x-technologies",
    "6sense": "6sense",
    "ABB": "abb",
    "Abnormal AI": "abnormal-ai",
    "Abridge": "abridgehq",
    "Accelsius": "accelsius",
    "ActiveFence": "alice-io",
    "Activeloop": "activeloop",
    "Actively AI": "actively-ai",
    "Ada": "ada-support",
    "Adaptive ML": "adaptive-ml",
    "Adobe": "adobe",
    "Advantest": "advantest",
    "Adversa AI": "adversa-ai",
    "Aera Technology": "aera-technology",
    "AG2": "ag2ai",
    "AgentOps": "https://www.agentops.ai/",
    "Agility Robotics": "agility-robotics",
    "Agno": "agno-agi",
    "AI21 Labs": "ai21",
    "Aidoc": "aidoc",
    "Aim Security": "aimsecurity",
    "Airbyte": "airbytehq",
    "AirTrunk": "airtrunk",
    "AiSDR": "aisdrapp",
    "AIVA": "aiva-technologies",
    "Akash Network": "akash-network",
    "Alchip": "alchip-technologies",
    "Aleph Alpha": "aleph-alpha",
    "Alibaba": "alibaba-group",
    "Alibaba Cloud": "alibaba-cloud-computing-company",
    "Aligned Data Centers": "aligned-energy",
    "All Hands AI": "openhands-ai",
    "Allen Institute for AI": "allen-ai",
    "AlphaSense": "alphasense",
    "Amazon": "amazon",
    "Ambarella": "ambarella",
    "Ambience Healthcare": "ambiencehealthcare",
    "AMD": "amd",
    "Amkor Technology": "amkor-technology",
    "Anchor Browser": "anchorbrowser",
    "Anduril": "anduril",
    "Anterior": "anteriorai",
    "Anthropic": "anthropicresearch",
    "Anyscale": "joinanyscale",
    "Anysphere": "cursorai",
    "Anyword": "keywee",
    "Apache TVM": "the-apache-software-foundation",
    "Apify": "apify",
    "Apollo Research": "apollo-research-ai",
    "Appen": "appen",
    "Apple": "apple",
    "Applied Digital": "applied-digital-co",
    "Applied Materials": "applied-materials",
    "Apptronik": "apptronik-inc.",
    "Aqua Voice": "aqua-voice",
    "ArangoDB": "arangodb",
    "Arc Institute": "arc-institute-org",
    "Arcade": "arcade-ai",
    "Arcads": "arcads-ai",
    "Arcee AI": "arcee-ai",
    "Argil": "argilai",
    "Arista": "arista-networks-inc",
    "Arize": "arizeai",
    "Arm": "arm",
    "Arthur AI": "arthurai",
    "Artisan": "artisanai",
    "Aryn": "aryn-ai",
    "ASE Group": "ase-group",
    "ASML": "asml",
    "AssemblyAI": "assemblyai",
    "Associated Press": "associated-press",
    "Assort Health": "assort-health",
    "Astera Labs": "astera-labs",
    "Atlassian": "atlassian",
    "Atomicwork": "atomicworkhq",
    "Augment Code": "augmentinc",
    "Aurora Innovation": "auroradriver",
    "AWS": "amazon-web-services",
    "Axel Springer": "axel-springer-se",
    "Axelera AI": "axelera-ai",
    "Axolotl": "axolotl-ai",
    "Ayar Labs": "ayar-labs",
    "Baidu": "baidu-inc",
    "Baidu AI Cloud": "baidu-ai-cloud",
    "Baseten": "baseten",
    "Basis": "get-basis-ai",
    "Be My Eyes": "be-my-eyes",
    "Beam": "beamcloud",
    "Beatoven.ai": "beatovenai",
    "Beautiful.ai": "beautiful-ai",
    "BentoML": "bentoml",
    "BerriAI": "berri-ai",
    "Besi": "besi-netherlands-bv",
    "Bespoke Labs": "bespoke-labs",
    "BetterUp": "betterup",
    "Biren Technology": "birentech",
    "Black Forest Labs": "bflai",
    "Bland AI": "bland-ai",
    "Bloom Energy": "bloom-energy",
    "Blue Yonder": "blueyonder",
    "Boomy": "boomy-corporation",
    "Boston Dynamics": "boston-dynamics",
    "Botika": "botika-io",
    "Botpress": "botpress",
    "Boundary": "boundaryml",
    "Brainly": "brainly-com",
    "Braintrust": "braintrust-data",
    "Brave": "brave-software",
    "Bria AI": "briaai",
    "Bright Data": "bright-data",
    "Bright Machines": "bright-machines",
    "Brightband": "brightbandtech",
    "Brightwave": "brightwave-io",
    "Broadcom": "broadcom",
    "Brookfield Renewable": "brookfield-renewable",
    "Browser Use": "browser-use",
    "Browserbase": "browserbasehq",
    "Browserless": "browserless",
    "ByteDance": "bytedance",
    "C2PA": "coalition-for-content-provenance-and-authenticity",
    "Cadence": "cadence-design-systems",
    "Cambricon": "cambricon",
    "CAMEL-AI": "camel-ai-org",
    "Canva": "canva",
    "Captions": "captions-app",
    "Carbon Robotics": "carbonrobotics",
    "Cartesia": "cartesia-ai",
    "Caterpillar": "caterpillar-inc",
    "Causaly": "causaly",
    "Celestial AI": "celestial-ai",
    "Celestica": "celestica",
    "Centaur Labs": "centaur-labs",
    "Cerebras": "cerebras-systems",
    "Cerebrium": "cerebrium",
    "Chai": "chai-research",
    "Chai Discovery": "chai-discovery",
    "Character.ai": "character-ai",
    "Check Point": "check-point-software-technologies",
    "Checkstep": "checkstep",
    "Chroma": "trychroma",
    "Ciena": "ciena",
    "Cinder": "cinder-intelligence",
    "Cisco": "cisco",
    "Civitai": "civitai",
    "Clay": "clay-hq",
    "Cleanlab": "cleanlab",
    "ClearML": "clearml",
    "Cleerly": "cleerlyhealth",
    "Clika": "clika",
    "Cline": "clinebot",
    "CloudFactory": "cloudfactory-com",
    "Cloudflare": "cloudflare",
    "Coactive AI": "coactiveai",
    "CodeRabbit": "coderabbitai",
    "Cognee": "cognee-ai",
    "Cognition": "cognition-ai-labs",
    "Cohere": "cohere-ai",
    "Cohere Health": "coherehealth",
    "Coherent": "coherent-corp",
    "Coinbase": "coinbase",
    "Colossyan": "colossyan",
    "Comet": "comet-ml",
    "Common Crawl": "common-crawl",
    "Commonwealth Fusion Systems": "commonwealth-fusion-systems",
    "Composio": "composiohq",
    "Confident AI": "confident-ai",
    "Consensus": "consensus-nlp",
    "Constellation Energy": "constellation-energy",
    "Continue": "continuedev",
    "Convai": "convaitech",
    "CoolIT Systems": "coolit-systems-inc-",
    "CopilotKit": "copilotkit",
    "Copy.ai": "fullcastcopyai",
    "Core Scientific": "corescientific",
    "CoreWeave": "coreweave",
    "Cornelis Networks": "cornelisnetworks",
    "Coval": "covaldev",
    "Coveo": "coveo",
    "Created by Humans": "createdbyhumans",
    "Creatify": "creatify-ai",
    "Credal": "credal-ai",
    "Credo": "credo-semi",
    "Credo AI": "credo-ai",
    "Crescendo": "crescendoai",
    "Cresta": "cresta-inc",
    "CrewAI": "crewai-inc",
    "CrowdStrike": "crowdstrike",
    "Crusoe": "crusoe",
    "CSM": "common-sense-machines",
    "Cummins": "cummins-inc",
    "CuspAI": "cusp-ai",
    "CyrusOne": "cyrusone",
    "Cytora": "cytora",
    "D-ID": "deidentification",
    "d-Matrix": "d-matrix",
    "Daily": "dailyco",
    "Darktrace": "darktrace",
    "Databricks": "databricks",
    "Datacurve": "datacurveai",
    "Datadog": "datadog",
    "Datalab": "datalabto",
    "DatologyAI": "datologyai",
    "Daytona": "daytonaio",
    "DBOS": "dbos-inc",
    "DDN": "ddn",
    "Decagon": "decagon-ai",
    "Decart": "decart-ai",
    "Deepgram": "deepgram",
    "DeepInfra": "deep-infra",
    "DeepL": "deepl",
    "DeepScribe": "deepscribe",
    "DeepSeek": "deepseek-ai",
    "deepset": "deepset-ai",
    "Defined.ai": "definedcrowd",
    "Dell": "delltechnologies",
    "Denvr Dataworks": "denvr-dataworks",
    "Descope": "descope",
    "Descript": "descript",
    "Deutsche Telekom": "telekom",
    "Dexterity": "dexterityinc",
    "Diffbot": "diffbot",
    "Dify": "langgenius",
    "Digimarc": "digimarc",
    "Digital Realty": "digitalrealty",
    "DigitalOcean": "digitalocean",
    "Digits": "digits-financial",
    "Diligent Robotics": "diligent-robotics",
    "Dominion Energy": "dominionenergy",
    "Doximity": "doximity",
    "DraftWise": "draftwise-ai",
    "DSPy": "dspy",
    "dstack": "dstackai",
    "Duality Robotics": "dualityai",
    "Dubverse": "dubverse",
    "Duke Energy": "duke-energy-corporation",
    "Duolingo": "duolingo",
    "Dyna Robotics": "dyna-robotics",
    "E2B": "e2b-dev",
    "E2E Networks": "e2enetworks",
    "Eaton": "eaton",
    "EdgeCore Digital Infrastructure": "edgecore-digital-infrastructure",
    "EdgeCortix": "edgecortix",
    "Eightfold AI": "eightfoldai",
    "Elastic": "elastic-co",
    "Elementary": "elementary-robotics",
    "ElevenLabs": "elevenlabsio",
    "Elicit": "elicit-org",
    "EliseAI": "eliseai",
    "Ello": "elloinc",
    "Emergent": "https://app.emergent.sh/",
    "Encord": "encord-team",
    "Enfabrica": "enfabricacorporation",
    "Entergy": "entergy",
    "Enzai": "enzai-technologies",
    "Equinix": "equinix",
    "Estuary": "estuary-tech",
    "Etched": "etched-ai",
    "EvenUp": "evenup",
    "EvolutionaryScale": "evolutionaryscale",
    "Exa": "exa-ai",
    "Extend": "extend-ai",
    "F5": "f5",
    "Fabi.ai": "fabi-ai",
    "Fable Simulation": "fable-studio",
    "Factory": "factory-hq",
    "FairNow": "fairnowai",
    "fal.ai": "features-and-labels",
    "FalkorDB": "falkordb",
    "Farama Foundation": "farama-foundation",
    "Fathom": "fathom-video",
    "Featherless AI": "recursal-ai",
    "Federato": "federato",
    "Feedzai": "feedzai",
    "Fervo Energy": "fervo-energy",
    "Fiddler AI": "fiddler-ai",
    "Field AI": "fieldai",
    "Figma": "figma",
    "Figure": "figure-ai",
    "Fintool": "fintoolx",
    "Firecrawl": "firecrawl",
    "Fireflies.ai": "fireflies-inc",
    "Fireworks": "fireworks-ai",
    "Firmus": "firmustechnologies",
    "Fish Audio": "fish-audio",
    "Fivetran": "fivetran",
    "Fixie": "ultravox-ai",
    "Flair.ai": "tryflairai",
    "Flock Safety": "flock-safety",
    "Flowise": "flowiseai",
    "Fluidstack": "fluidstack",
    "Forethought": "forethought-ai",
    "Forter": "forter",
    "Foxconn": "foxconn",
    "Fractile": "fractile",
    "Freed": "freed-ai",
    "Freepik": "freepik-company",
    "FriendliAI": "friendliai",
    "FuriosaAI": "furiosaai",
    "G42": "g42ai",
    "Galileo": "galileo-ai",
    "Gamma": "gamma-app",
    "GE Vernova": "gevernova",
    "Generalist AI": "generalistai",
    "Generate:Biomedicines": "generate-biomedicines",
    "Genesis AI": "gs-ai",
    "Genesis Cloud": "genesiscloud",
    "Genmo": "genmoai",
    "Genspark": "mainfunc",
    "GetReal Security": "getrealsecurity",
    "Getty Images": "getty-images",
    "Gigabyte": "gigabyte",
    "GitHub": "github",
    "Gladia": "gladia-io",
    "Glass Health": "glass-health-inc",
    "Glean": "gleanwork",
    "Gling": "gling-ai",
    "GlobalFoundries": "globalfoundries",
    "Google": "google",
    "Google DeepMind": "googledeepmind",
    "Gorgias": "gorgias",
    "Grammarly": "grammarly",
    "Granola": "meetgranola",
    "Graphcore": "graphcore",
    "Graphite": "withgraphite",
    "Graphlit": "graphlit",
    "Gray Swan AI": "grayswanai",
    "GRC": "green-revolution-cooling",
    "Greptile": "greptile",
    "Groq": "groq",
    "Guardrails AI": "guardrailsai",
    "Gumloop": "gumloop",
    "Guru": "getguru",
    "Hadrian": "hadrianautomation",
    "Hailo": "hailo-ai",
    "Haize Labs": "haizelabs",
    "Halluminate": "halluminate",
    "Hammerspace": "hammerspace",
    "Hamming AI": "hamming-ai",
    "Handshake": "team-handshake",
    "Harmonic": "harmonicmath",
    "Harvey": "harvey-ai",
    "Hatchet": "hatchet-run",
    "Headspace": "headspaceapp",
    "Hebbia": "hebbia",
    "Hedra": "hedra-labs",
    "Heidi Health": "heidi",
    "Helicone": "helicone",
    "Helion Energy": "helion-energy",
    "Helsing": "helsing",
    "Hex": "hex-technologies",
    "HeyGen": "heygen",
    "Hidden Door": "hiddendoor",
    "HiddenLayer": "hiddenlayersec",
    "Higgsfield": "higgsfield",
    "Hippocratic AI": "hippocratic-ai-health",
    "HireVue": "hirevue",
    "Hitachi Energy": "hitachienergy",
    "Hive": "hiveai",
    "Holistic AI": "holisticai",
    "HoneyHive": "honeyhive-ai",
    "HPC-AI Tech": "hpc-ai-technology",
    "HPE": "hewlett-packard-enterprise",
    "Huawei": "huawei",
    "HubSpot": "hubspot",
    "Hugging Face": "huggingface",
    "HUMAIN": "humainai",
    "Human Native AI": "human-native",
    "Hume AI": "hume-ai",
    "Hyper3D": "hyper3d",
    "Hyperbolic": "hyperbolic-labs",
    "Hyperbound": "hyperbound-ai",
    "Hyperbrowser": "hyperbrowser",
    "Hyperscience": "hyperscience",
    "Hypotenuse AI": "hypotenuse-ai",
    "IBM": "ibm",
    "Ideogram": "ideogram-ai",
    "IMATAG": "imatag-digital-watermarking",
    "iMerit": "imerit",
    "Inceptive": "inceptivenucleics",
    "Inference.net": "inference-net",
    "Infinitus Systems": "infinitusai",
    "Inflection AI": "inflectionai",
    "Inngest": "inngest-inc",
    "Inspur": "inspur-information",
    "Instabase": "instabase",
    "Instrumental": "instrumental-inc.",
    "Intel": "intel-corporation",
    "Intercom": "intercom",
    "invideo AI": "invideoio",
    "Invisible Technologies": "invisible-technologies-inc-",
    "Inworld": "inworld-ai",
    "io.net": "ionet-official",
    "IREN": "iris-energy",
    "Iron Mountain Data Centers": "iron-mountain-data-centers",
    "Ironclad": "ironclad-inc-",
    "Irregular": "pattern-labs",
    "Isomorphic Labs": "isomorphic-labs",
    "Jan": "jan-ai",
    "Jasper": "heyjasperai",
    "JetBrains": "jetbrains",
    "JetCool": "jetcool",
    "Jina AI": "jinaai",
    "Johnson Controls": "johnson-controls",
    "Jua": "juaai",
    "Juicebox": "juicebox-work",
    "Julius AI": "julius-ai",
    "Jupiter Intelligence": "jupiterintel",
    "Kaedim": "kaedim",
    "Kagi": "kagi",
    "Kairos Power": "kairospower",
    "Kernel": "onkernel",
    "Keycard": "keycard-labs",
    "Kilo Code": "kilo-code",
    "Kinaxis": "kinaxis",
    "Kindroid": "kindroid",
    "Kioxia": "kioxia-america-inc",
    "Kittl": "kittl",
    "KLA": "klacorp",
    "Klarity": "https://www.klarity.ai/index",
    "Kneron": "kneron",
    "Kodiak Robotics": "kodiakai",
    "Kong": "konghq",
    "Kore.ai": "kore-inc",
    "Koyeb": "koyeb",
    "Krea": "krea-ai",
    "Krisp": "krisphq",
    "Krutrim": "krutrim",
    "Kuaishou": "kuaishou",
    "KUDO": "kudoway",
    "Kumo AI": "kumo-ai",
    "Kyutai": "kyutai-labs",
    "Labelbox": "labelbox",
    "Lam Research": "lam-research",
    "Lambda": "lambda-labs",
    "Laminar": "lmnr-ai",
    "LanceDB": "lancedb",
    "Lancium": "lancium",
    "Landing AI": "landing-ai",
    "LangChain": "langchain",
    "Langflow": "langflow",
    "Langfuse": "langfuse",
    "LanguageTool": "languagetool",
    "Lark Health": "lark-technologies",
    "Latent Labs": "latent-labs",
    "Latitude": "latitude-games",
    "Layer AI": "layerai",
    "LegalOn": "legalon-technologies",
    "Legora": "wearelegora",
    "Lenovo": "lenovo",
    "Letta": "letta-ai",
    "LexisNexis": "lexisnexis",
    "LG AI Research": "lgairesearch",
    "Lightmatter": "lightmatter",
    "Lightricks": "lightricks",
    "Lila Sciences": "lila-sciences",
    "Lilt": "lilthq",
    "Lindy": "lindyai",
    "Linkup": "linkup-platform",
    "Liquid AI": "liquid-ai-inc",
    "LiquidStack": "liquidstack",
    "Litera": "literamicrosystems",
    "LiveKit": "livekitco",
    "llama.cpp": "ggml-org",
    "LlamaIndex": "llamaindex",
    "LM Studio": "lmstudio-ai",
    "LMArena": "arenaai",
    "LMNT": "lmnt",
    "Looka": "looka",
    "Loora": "loora",
    "Lorikeet": "lorikeetcx",
    "Loudly": "loudlytech",
    "Lovable": "lovable-dev",
    "Lovart": "lovart-ai",
    "Luma": "lumalabsai",
    "Lumentum": "lumentum",
    "Luminance": "luminancetech",
    "Lunit": "lunit",
    "Machina Labs": "machina-labs",
    "Magic": "magicailabs",
    "Make": "integromat",
    "Manus": "manus-im",
    "Marqo": "marqo-ai",
    "Martian": "withmartian",
    "Marvell": "marvell",
    "Mastercard": "mastercard",
    "Mastra": "mastra-ai",
    "MatX": "matxcomputing",
    "Maven AGI": "mavenagi",
    "Mechanize": "mechanize-inc",
    "MediaTek": "mediatek",
    "Mem": "mem-labs",
    "Mem0": "mem0",
    "Memgraph": "memgraph",
    "Mercor": "mercor-io",
    "Merge": "merge-api",
    "Meshy": "meshyai",
    "Meta": "facebook",
    "MetaX": "https://www.linkedin.com/showcase/metax-ai-solutions/",
    "METR": "metr-evals",
    "micro1": "micro1",
    "Micron": "micron-technology",
    "Microsoft": "microsoft",
    "Midjourney": "midjourney",
    "Mindgard": "mindgard",
    "MindStudio": "buildwithremy",
    "MiniMax": "minimax-ai",
    "MinIO": "minio-inc-",
    "Miro": "mirohq",
    "Mistral": "mistralai",
    "Mistral AI": "mistralai",
    "Mixedbread": "mixedbread-ai",
    "Modal": "modal-labs",
    "ModelOp": "modelop",
    "Modular": "modular-ai",
    "Moments Lab": "momentslab",
    "MongoDB": "mongodbinc",
    "Monitaur": "monitaur",
    "Moonshot AI": "kimi-ai",
    "Moonvalley": "moonvalley-ai",
    "Moore Threads": "moorethreads",
    "Morph": "morphllm",
    "MOSTLY AI": "mostlyai",
    "Motivair": "motivair-corporation",
    "Moveworks": "moveworksai",
    "Mozilla": "mozilla-corporation",
    "Mubert": "mubert",
    "Multiverse Computing": "multiversecomputing",
    "Murf AI": "murf-ai",
    "Mursion": "mursion",
    "Musubi": "musubi",
    "n8n": "n8n",
    "Nabla": "nablahq",
    "Nango": "nangohq",
    "Nanonets": "nanonets",
    "Napkin AI": "napkin-ai",
    "Naver": "naver",
    "Naver Cloud": "navercloud",
    "Nebius": "nebius",
    "Nekuda": "nekuda",
    "Neo4j": "neo4j",
    "Neptune.ai": "neptuneai",
    "NetApp": "netapp",
    "Netomi": "netomi",
    "News Corp": "newscorp",
    "Nexa AI": "nexa-ai",
    "NextEra Energy": "nextera-energy-inc",
    "Noma Security": "noma-security",
    "Nomi AI": "https://nomi.ai/",
    "Nomic AI": "nomic-ai",
    "Norm Ai": "normative-ai",
    "Not Diamond": "notdiamond",
    "Nota AI": "notaai",
    "Notable Health": "notablehealth",
    "Notion": "notionhq",
    "Nous Research": "nousresearch",
    "NovelAI": "anlatan",
    "Novita AI": "novita-ai-labs",
    "NRG Energy": "nrg-energy",
    "Nscale": "nscale-cloud",
    "NTT DATA": "nttdata",
    "Nuro": "nuro-inc.",
    "NuScale Power": "nuscale-power",
    "nVent": "nvent",
    "Nvidia": "nvidia",
    "o9 Solutions": "o9solutions",
    "Ocrolus": "ocrolus",
    "Odyssey": "odysseyml",
    "Oklo": "oklo",
    "Okta": "okta-inc-",
    "Ollama": "ollama",
    "OneTrust": "onetrust",
    "Onyx": "onyx-dot-app",
    "OpenAI": "openai",
    "OpenEvidence": "openevidence",
    "Openlayer": "openlayerco",
    "OpenPipe": "openpipe",
    "OpenRouter": "openrouter",
    "Opera": "opera-software",
    "OpusClip": "opusclip",
    "Oracle": "oracle",
    "Orbital Materials": "orbitalmaterials",
    "OthersideAI": "othersideai",
    "Otter": "otter-ai",
    "Oumi": "oumi-ai",
    "Oura": "oura",
    "Overjet": "overjet",
    "OVHcloud": "ovhgroup",
    "Oxide Computer": "oxidecomputer",
    "Oxylabs": "oxylabs-io",
    "Paige": "paige-ai",
    "Palo Alto Networks": "palo-alto-networks",
    "Paradox": "paradoxolivia",
    "Paragon": "useparagon",
    "Parallel Domain": "parallel-domain",
    "Parallel Web Systems": "parallel-web",
    "Parasail": "parasail-io",
    "Parloa": "parloa",
    "PathAI": "pathai",
    "Pathway": "pathway",
    "Patronus": "patronusai",
    "Patsnap": "patsnap",
    "Payman": "paymanai",
    "Pebblely": "pebblely",
    "Pecan AI": "pecan-ai",
    "Periodic Labs": "periodic-labs",
    "Perplexity": "perplexity-ai",
    "Persana AI": "persana-ai",
    "Phind": "hello-cognition",
    "Photoroom": "photoroom",
    "Physical Intelligence": "physical-intelligence",
    "Pika": "pika-labs",
    "Pindrop": "pindrop",
    "Pinecone": "pinecone-io",
    "Pipedream": "pipedreamhq",
    "Pixelcut": "pixa-pixelcut",
    "Plaud": "plaudai",
    "Playground": "playground-ai",
    "Plus AI": "plusai",
    "PolyAI": "polyai",
    "Pony.ai": "pony-ai",
    "Poolside": "poolsideai",
    "Portkey": "portkey-ai",
    "Portola": "hiportola",
    "Positron": "positron-ai",
    "Praktika": "praktika-ai",
    "Predibase": "predibase",
    "Prefect": "prefect",
    "Prime Intellect": "primeintellect-ai",
    "Prisma Labs": "prismalabs",
    "Profluent": "profluent-bio",
    "Prolific": "prolific-com",
    "Promptfoo": "promptfoo",
    "ProRata.ai": "prorataai",
    "Protege": "withprotege",
    "ProWritingAid": "prowritingaid",
    "Pruna AI": "pruna-ai",
    "Pure Storage": "pure-storage",
    "Pydantic": "pydantic",
    "PyTorch": "pytorch",
    "Qdrant": "qdrant",
    "Qodo": "qodoai",
    "QTS Data Centers": "qtsdatacenters",
    "Qualcomm": "qualcomm",
    "Qualified": "qualified-com",
    "Quanta Computer": "quanta-computer-inc-",
    "Quanta Services": "quanta-services",
    "QuillBot": "quillbot",
    "Quora": "quora",
    "Qure.ai": "qure.ai",
    "Rad AI": "radai",
    "Rafay": "rafay-systems",
    "Ragas": "ragas-io",
    "Ragie": "ragie",
    "Raindrop": "raindrop-ai",
    "Rapidus": "rapidus-corporation",
    "Rask": "rask-ai",
    "Read AI": "readinc",
    "Reality Defender": "reality-defender",
    "Rebellions": "rebellions-ai",
    "Recraft": "recraft-ai",
    "Recursion": "recursion-pharmaceuticals",
    "Red Hat": "red-hat",
    "Reddit": "reddit-com",
    "Redis": "redisinc",
    "Reducto": "reducto-ai",
    "Reflection AI": "reflectionai",
    "Regie.ai": "regie-ai",
    "Reka AI": "reka-ai",
    "Relevance AI": "relevanceai",
    "RELEX Solutions": "relexsolutions",
    "Rendered.ai": "rendered-ai",
    "Replicate": "replicate",
    "Replika": "luka-inc",
    "Replit": "repl-it",
    "Requesty": "requesty",
    "Resemble AI": "resembleai",
    "Restate": "restatedev",
    "Retell": "retellai",
    "Rev": "rev-com",
    "Reve": "reveimage",
    "Riffusion": "producerdotai",
    "Rillet": "team-rillet",
    "Rime": "rime-ai",
    "Riskified": "riskified",
    "Roblox": "roblox",
    "Rogo": "rogoai",
    "Roots Automation": "bevaya",
    "Rosebud": "rosebud-journal",
    "Rossum": "rossum",
    "Runloop": "runloopai",
    "RunPod": "runpod-io",
    "Runway": "runwayml",
    "Safe Superintelligence": "safesuperintelligenceinc",
    "Saidot": "saidot",
    "Sakana AI": "sakana-ai",
    "Sakura Internet": "sakura-internet-inc",
    "Salad": "salad-technologies",
    "Salesforce": "salesforce",
    "Sama": "sama-ai",
    "SambaNova": "sambanova-systems",
    "Samsung": "samsung-electronics",
    "Sanas": "sanas",
    "Sandisk": "sandisk",
    "Sardine": "sardineai",
    "Saronic": "saronic-technologies",
    "Sarvam AI": "sarvam-ai",
    "Scale AI": "scaleai",
    "Scaleway": "scaleway",
    "Scenario": "scenario-gg",
    "SchedMD": "schedmd-llc",
    "Schneider Electric": "schneider-electric",
    "Scholarcy": "scholarcy",
    "SciSpace": "scispace",
    "Scite": "sciteai",
    "Screenpipe": "mediar-ai",
    "Seagate": "seagate-technology",
    "Second Nature": "second-nature-ai",
    "Semgrep": "semgrep",
    "Sensible": "usesensible",
    "SentinelOne": "sentinelone",
    "SerpApi": "serpapi",
    "Serval": "getserval",
    "Serve Robotics": "serverobotics",
    "Sesame": "sesameai",
    "Sesterce": "sestercegroup",
    "SF Compute": "sfcompute",
    "SGLang": "sgl-project",
    "Shadeform": "shadeformai",
    "ShengShu": "vidu-ai",
    "Shield AI": "shield-ai",
    "Shift Technology": "shift-technology",
    "Shopify": "shopify",
    "Shutterstock": "shutterstock",
    "Siemens Energy": "siemens-energy",
    "Sierra": "sierra",
    "Sift": "getsift",
    "SiliconFlow": "siliconflow",
    "SiMa.ai": "sima-ai",
    "Simular": "simular-ai",
    "SingleStore": "singlestore",
    "Sixfold": "sixfold-ai",
    "SK Hynix": "sk-hynix",
    "Skild AI": "skild-ai",
    "Skillsoft": "skillsoft",
    "Skydio": "skydio",
    "Skyfire": "tryskyfire",
    "SkyPilot": "skypilot-ai",
    "Slingshot AI": "slingshotai",
    "Sloyd": "sloyd",
    "Smartcat": "smartcatai",
    "SMIC": "smic",
    "Snap": "snap-inc-co",
    "Snorkel AI": "snorkel-ai",
    "Snowflake": "snowflake-computing",
    "Socure": "socure",
    "SoftBank": "softbankgroup",
    "Sonia": "sonia-health",
    "Soniox": "soniox",
    "Soundraw": "soundraw",
    "Sourcegraph": "sourcegraph",
    "SpAItial": "spaitial-ai",
    "Speak": "usespeak",
    "Speechify": "speechifyinc",
    "Speechmatics": "speechmatics",
    "Spellbook": "spellbookai",
    "Spline": "splinetool",
    "Stability AI": "stability-ai",
    "Stack AI": "stackai",
    "STACK Infrastructure": "stackinfrastructure",
    "Stack Overflow": "stack-overflow",
    "StackBlitz": "boltdotnew",
    "Stardog": "stardog-union",
    "Steel": "steeldotdev",
    "Steg.AI": "steg-ai",
    "StepFun": "stepfun-ai",
    "Stripe": "stripe",
    "Stytch": "stytch",
    "Submer": "submer",
    "Sudowrite": "sudowrite",
    "Suki": "suki-ai",
    "Suno": "suno-ai",
    "Supabase": "supabase",
    "SuperAnnotate": "superannotate",
    "Supermemory": "supermemory",
    "Supermicro": "supermicro",
    "Superwhisper": "superwhisper",
    "Supio": "supio",
    "Surge AI": "surge-ai",
    "Switch": "switch-data-centers",
    "Symbotic": "symbotic",
    "Synopsys": "synopsys",
    "Synthesia": "synthesia-technologies",
    "Synthesis": "synthesis-school",
    "Synthesis AI": "synthesis-ai",
    "Synthflow": "synthflowai",
    "Syntiant": "syntiant-corp",
    "Taalas": "taalas",
    "Tabnine": "tabnine",
    "Talen Energy": "talenenergy",
    "Tavily": "tavily",
    "Tavus": "tavus-io",
    "Taylor & Francis": "taylor-&-francis-group",
    "Technology Innovation Institute": "tiiuae",
    "Temporal": "temporal-technologies",
    "Tencent": "tencent",
    "Tencent Cloud": "tencent-cloud",
    "Tennr": "tennrai",
    "TensorDock": "tensordock",
    "Tensorlake": "tensorlake",
    "Tensormesh": "tensormesh",
    "TensorWave": "tensorwave",
    "Tenstorrent": "tenstorrent-inc.",
    "TeraWulf": "terawulf",
    "TerraPower": "terrapower",
    "Tesla": "tesla-motors",
    "The Browser Company": "the-browser-company",
    "Thinking Machines Lab": "thinkingmachinesai",
    "Thomson Reuters": "thomson-reuters",
    "Thoughtful AI": "thoughtful-ai",
    "Thoughtly": "thoughtly-ai",
    "ThoughtSpot": "thoughtspot",
    "TigerGraph": "tigergraph",
    "Timekettle": "timekettletech",
    "tl;dv": "tl-dv",
    "Together AI": "togethercomputer",
    "Tokyo Electron": "tokyo-electron",
    "TollBit": "tollbit",
    "Toloka": "toloka",
    "Tomorrow.io": "tomorrow-io",
    "Tonic.ai": "tonicai",
    "Topaz Labs": "topaz-labs",
    "Toyota Research Institute": "toyota-research-institute",
    "Traceloop": "traceloop",
    "Tractable": "tractable",
    "Trane Technologies": "tranetechnologies",
    "Trigger.dev": "triggerdotdev",
    "Tripo AI": "tripoai",
    "Truepic": "truepic-inc",
    "Trustible": "trustible",
    "TSMC": "tsmc",
    "turbopuffer": "turbopuffer",
    "Turing": "turing",
    "Twelve Labs": "twelvelabs",
    "Typeface": "typeface-ai",
    "Udio": "udiomusic",
    "Unbabel": "unbabel",
    "Unify": "unifygtm",
    "Unit21": "unit21",
    "Unitary": "unitaryai",
    "Unitree Robotics": "unitreerobotics",
    "Unsloth": "unsloth",
    "Unstract": "unstract",
    "Unstructured": "unstructuredio",
    "Upstage": "upstageai",
    "Upstart": "upstart-network",
    "Valohai": "valohai",
    "Vals AI": "vals-ai",
    "Valyu": "valyu-ai",
    "Vanna AI": "vanna-ai",
    "Vantage Data Centers": "vantage-data-centers",
    "Vapi": "vapi-ai",
    "VAST Data": "vast-data",
    "Vast.ai": "vast-ai",
    "Vectorize": "vectorizeio",
    "Vectra AI": "vectra_ai",
    "Vercel": "vercel",
    "Vertiv": "vertiv",
    "Vespa.ai": "vespa-ai",
    "Vic.ai": "vic.ai",
    "Visa": "visa",
    "Vistra": "vistra-energy",
    "Viz.ai": "viz-ai",
    "vLex": "vlex",
    "vLLM": "vllm-project",
    "Vocode": "vocode-dev",
    "Voiceflow": "voiceflowhq",
    "Voltage Park": "voltage-park",
    "Voxel51": "voxel51",
    "Vultr": "vultr",
    "Warp": "warpdotdev",
    "Waymo": "waymo",
    "Wayve": "wayve-technologies",
    "Weaviate": "weaviate-io",
    "Weights & Biases": "wandb",
    "WEKA": "weka-io",
    "WellSaid Labs": "wellsaidlabs",
    "WeRide": "werideai",
    "Western Digital": "western-digital",
    "Whoop": "whoop",
    "WhyHow.AI": "whyhow-ai",
    "Wiley": "john-wiley-and-sons",
    "Willow Voice": "willowvoice",
    "Wispr": "wisprflow",
    "Wistron": "wistron",
    "Wiwynn": "wiwynn",
    "Wix": "wix-com",
    "Wolters Kluwer": "wolters-kluwer",
    "Wondercraft": "wondercraft-ai",
    "Wordly": "wordly-inc",
    "Workato": "workato",
    "Workday": "workday",
    "WorkOS": "workos-inc",
    "World Labs": "world-labs",
    "Wren AI": "wrenai",
    "Writer": "getwriter",
    "Wysa": "wysa-ai",
    "X-energy": "x-energy",
    "xAI": "xai",
    "YData": "ydataai",
    "Yondr": "yondrgroup",
    "Yoodli": "yoodli",
    "Yotta": "yotta-data-services",
    "You.com": "youdotcom",
    "Zapier": "zapier",
    "Zed": "zeddotdev",
    "Zendesk": "zendesk",
    "Zenity": "zenitysec",
    "Zenlytic": "zenlytic",
    "Zep": "zep-ai",
    "ZeroEyes": "zeroeyes-ai",
    "Zest AI": "zest-ai",
    "ZestyAI": "zesty-ai",
    "Zhipu AI": "zdotai",
    "Zilliz": "zilliz",
    "Zipline": "flyzipline",
    "Zoom": "zoom",
    "Zyte": "zytedata"
  },
  "profiles": {
    "01.AI": {
      "desc": "Chinese lab, founded by Kai-Fu Lee, behind the Yi open models.",
      "web": "https://www.01.ai"
    },
    "11x": {
      "desc": "AI digital workers that do sales prospecting and outreach.",
      "web": "https://www.11x.ai"
    },
    "1X": {
      "desc": "Builds humanoid robots for household chores.",
      "web": "https://www.1x.tech"
    },
    "6sense": {
      "desc": "Predicts which companies are ready to buy, for B2B sales and marketing.",
      "web": "https://6sense.com"
    },
    "A2A": {
      "desc": "Agent2Agent, an open protocol that lets AI agents from different vendors talk.",
      "web": "https://a2a-protocol.org"
    },
    "ABB": {
      "desc": "Electrification and automation equipment, including switchgear and power systems for data centers.",
      "web": "https://global.abb"
    },
    "Abnormal AI": {
      "desc": "Email security that stops phishing by learning normal user behavior.",
      "web": "https://abnormal.ai"
    },
    "Abridge": {
      "desc": "Medical scribe that turns doctor-patient conversations into clinical notes.",
      "web": "https://www.abridge.com"
    },
    "Accelsius": {
      "desc": "Two-phase direct-to-chip liquid cooling for servers and GPUs.",
      "web": "https://accelsius.com"
    },
    "ACE": {
      "desc": "Nvidia tools for building talking game characters and digital humans.",
      "web": "https://developer.nvidia.com/ace"
    },
    "ACP (Agentic Commerce Protocol)": {
      "desc": "Open standard for AI agents to complete purchases with merchants.",
      "web": "https://www.agenticcommerce.dev"
    },
    "ActiveFence": {
      "desc": "Detects harmful content and abuse for online platforms and model makers.",
      "web": "https://www.activefence.com"
    },
    "Activeloop": {
      "desc": "Deep Lake database for storing and streaming AI data and embeddings.",
      "web": "https://www.deeplake.ai"
    },
    "Actively AI": {
      "desc": "Agents that research accounts and help sales teams build pipeline and close deals.",
      "web": "https://www.actively.ai"
    },
    "Ada": {
      "desc": "AI agents that automate customer service across chat, email and voice.",
      "web": "https://www.ada.cx"
    },
    "Adaptive ML": {
      "desc": "Tools for tuning language models with reinforcement learning, now part of Datadog.",
      "web": "https://www.adaptive-ml.com"
    },
    "Adobe Express": {
      "desc": "Adobe's quick design app for social posts, flyers and short videos.",
      "web": "https://www.adobe.com/express"
    },
    "Advantest": {
      "desc": "Automated test equipment that checks chips, including AI chips and memory.",
      "web": "https://www.advantest.com"
    },
    "Adversa AI": {
      "desc": "Red-teaming and security testing for AI models and agents.",
      "web": "https://adversa.ai"
    },
    "Aera Technology": {
      "desc": "Software that automates supply chain and operations decisions.",
      "web": "https://www.aeratechnology.com"
    },
    "AG-UI": {
      "desc": "Open protocol that connects AI agents to user-facing app interfaces.",
      "web": "https://docs.ag-ui.com"
    },
    "AG2": {
      "desc": "Open-source framework for multi-agent conversations, forked from AutoGen.",
      "web": "https://ag2.ai"
    },
    "Agentforce": {
      "desc": "Salesforce's platform for building and deploying AI agents in its CRM.",
      "web": "https://www.salesforce.com/agentforce/"
    },
    "AgentKit": {
      "desc": "OpenAI's tools for visually building, deploying and evaluating agents.",
      "web": "https://openai.com/index/introducing-agentkit/"
    },
    "AgentOps": {
      "desc": "Tool for tracking, debugging and measuring the cost of AI agents.",
      "web": "https://www.agentops.ai"
    },
    "Agility Robotics": {
      "desc": "Builds Digit, a humanoid robot that moves totes in warehouses.",
      "web": "https://www.agilityrobotics.com"
    },
    "Agno": {
      "desc": "Open-source framework and runtime for building multi-agent systems.",
      "web": "https://www.agno.com"
    },
    "AI Dungeon": {
      "desc": "Text adventure game where a language model narrates your story.",
      "web": "https://aidungeon.com"
    },
    "AI Gateway": {
      "desc": "Cloudflare's proxy for caching, logging, and controlling AI API calls.",
      "web": "https://developers.cloudflare.com/ai-gateway/"
    },
    "AI Mode": {
      "desc": "Google Search mode that answers complex questions in conversation with links.",
      "web": "https://search.google"
    },
    "Ai2 (OLMo)": {
      "desc": "Ai2's fully open language models, released with data and training code.",
      "web": "https://allenai.org/olmo"
    },
    "AI21 Labs": {
      "desc": "Israeli company building Jamba language models and enterprise AI systems.",
      "web": "https://www.ai21.com"
    },
    "Aidoc": {
      "desc": "Reviews medical scans to flag urgent findings for radiologists.",
      "web": "https://www.aidoc.com"
    },
    "Aim Security": {
      "desc": "Secures company use of generative AI tools, now part of Cato Networks.",
      "web": "https://www.aim.security"
    },
    "Airbyte": {
      "desc": "Open-source tool for moving data between apps, databases, and warehouses.",
      "web": "https://airbyte.com"
    },
    "AirTrunk": {
      "desc": "Hyperscale data center operator in Asia-Pacific and the Middle East.",
      "web": "https://airtrunk.com"
    },
    "AiSDR": {
      "desc": "AI sales agent that writes and sends personalized outreach emails.",
      "web": "https://aisdr.com"
    },
    "AIVA": {
      "desc": "Generates original music compositions in many styles.",
      "web": "https://www.aiva.ai"
    },
    "Akash Network": {
      "desc": "Decentralized marketplace where anyone can rent or lease spare cloud compute.",
      "web": "https://akash.network"
    },
    "Alchip": {
      "desc": "Taiwanese design services firm that builds custom ASICs, including AI chips.",
      "web": "https://www.alchip.com"
    },
    "Aleph Alpha": {
      "desc": "German company providing sovereign AI models and platform to governments and enterprises.",
      "web": "https://aleph-alpha.com"
    },
    "Alexa+": {
      "desc": "Amazon's upgraded Alexa voice assistant that can complete tasks.",
      "web": "https://www.amazon.com/alexaplus"
    },
    "Alibaba Cloud": {
      "desc": "Alibaba's cloud platform and the largest cloud provider in China.",
      "web": "https://www.alibabacloud.com"
    },
    "Alibaba Qwen": {
      "desc": "Alibaba's family of open-weight language and multimodal models.",
      "web": "https://qwen.ai"
    },
    "Aligned Data Centers": {
      "desc": "Developer and operator of scalable, energy-efficient data centers for hyperscalers and enterprises.",
      "web": "https://aligneddc.com"
    },
    "AlphaSense": {
      "desc": "Market research search over filings, broker reports and expert call transcripts.",
      "web": "https://www.alpha-sense.com"
    },
    "Amazon Bedrock": {
      "desc": "AWS service for accessing many foundation models through one API.",
      "web": "https://aws.amazon.com/bedrock/"
    },
    "Amazon Nova": {
      "desc": "Amazon's own foundation models offered through AWS Bedrock.",
      "web": "https://aws.amazon.com/ai/generative-ai/nova/"
    },
    "Amazon Q Business": {
      "desc": "AWS assistant that answers questions from a company's own data and apps.",
      "web": "https://aws.amazon.com/q/business/"
    },
    "Amazon Q Developer": {
      "desc": "AWS's coding assistant for writing, testing and upgrading code.",
      "web": "https://aws.amazon.com/q/developer"
    },
    "Amazon Q in QuickSight": {
      "desc": "Assistant in QuickSight that builds dashboards and answers data questions.",
      "web": "https://aws.amazon.com/quicksight/q/"
    },
    "Amazon SageMaker": {
      "desc": "Amazon's managed service for building, training, and deploying models.",
      "web": "https://aws.amazon.com/sagemaker/"
    },
    "Ambarella": {
      "desc": "Video and AI vision chips for security cameras, cars and robots.",
      "web": "https://www.ambarella.com"
    },
    "Ambience Healthcare": {
      "desc": "Medical scribe that drafts clinical notes and billing codes.",
      "web": "https://www.ambiencehealthcare.com"
    },
    "AMD": {
      "desc": "CPUs and Instinct GPUs for data centers, plus the ROCm software stack.",
      "web": "https://www.amd.com"
    },
    "Amkor Technology": {
      "desc": "Outsourced chip packaging and testing, including advanced packaging for AI chips.",
      "web": "https://amkor.com"
    },
    "Amp": {
      "desc": "Coding agent that runs in the terminal and editor.",
      "web": "https://ampcode.com"
    },
    "Anchor Browser": {
      "desc": "Cloud browsers that let AI agents act on websites securely.",
      "web": "https://anchorbrowser.io"
    },
    "Anduril": {
      "desc": "Defense company building autonomous drones, sensors and command software.",
      "web": "https://www.anduril.com"
    },
    "Anterior": {
      "desc": "Clinical review automation for health insurers' prior authorization decisions.",
      "web": "https://www.anterior.com"
    },
    "Anthropic": {
      "desc": "AI safety and research company that makes the Claude models.",
      "web": "https://www.anthropic.com"
    },
    "Anyscale": {
      "desc": "Managed platform for Ray, the open-source framework for distributed Python and AI.",
      "web": "https://www.anyscale.com"
    },
    "Anyword": {
      "desc": "Marketing copy generation with predicted performance scores.",
      "web": "https://www.anyword.com"
    },
    "AP2 (Agent Payments Protocol)": {
      "desc": "Open protocol for AI agents to make payments on users' behalf.",
      "web": "https://ap2-protocol.org"
    },
    "Apache TVM": {
      "desc": "Open-source compiler that optimizes machine learning models for many hardware types.",
      "web": "https://tvm.apache.org"
    },
    "Apify": {
      "desc": "Marketplace and cloud platform for web scrapers and automation tools.",
      "web": "https://apify.com"
    },
    "Apollo Go": {
      "desc": "Baidu's driverless robotaxi service operating in Chinese and other cities.",
      "web": "https://www.apollogo.com"
    },
    "Apollo Research": {
      "desc": "Nonprofit that audits AI models for deceptive and dangerous behavior.",
      "web": "https://www.apolloresearch.ai"
    },
    "Appen": {
      "desc": "Crowdsourced data collection and labeling for training AI models.",
      "web": "https://www.appen.com"
    },
    "Apple": {
      "desc": "Consumer devices whose in-house chips include a Neural Engine for on-device AI.",
      "web": "https://www.apple.com"
    },
    "Apple Intelligence": {
      "desc": "Apple's on-device and private-cloud AI features across iPhone, iPad and Mac.",
      "web": "https://www.apple.com/apple-intelligence/"
    },
    "Apple MLX": {
      "desc": "Apple's array framework for running and training models on Apple silicon.",
      "web": "https://github.com/ml-explore/mlx"
    },
    "Applied Digital": {
      "desc": "Builder and operator of high-power data centers leased for AI and high-performance computing.",
      "web": "https://www.applieddigital.com"
    },
    "Applied Materials": {
      "desc": "Equipment for depositing, etching and modifying materials on silicon wafers.",
      "web": "https://www.appliedmaterials.com"
    },
    "Apptronik": {
      "desc": "Builds Apollo, a humanoid robot for logistics and manufacturing work.",
      "web": "https://apptronik.com"
    },
    "Aqua Voice": {
      "desc": "Voice dictation app that writes and edits text as you speak.",
      "web": "https://aquavoice.com"
    },
    "ArangoDB": {
      "desc": "Database that combines graph, document, and vector data.",
      "web": "https://arango.ai"
    },
    "Arc Institute (Evo)": {
      "desc": "Arc Institute's Evo models trained on DNA to read and design genomes.",
      "web": "https://arcinstitute.org"
    },
    "Arcade": {
      "desc": "Runtime that lets AI agents act in other apps with secure, user-level authorization.",
      "web": "https://www.arcade.dev"
    },
    "Arcads": {
      "desc": "Video ads with generated actors from text scripts.",
      "web": "https://www.arcads.ai"
    },
    "Arcee AI": {
      "desc": "Builds small, efficient language models and tools for customizing them.",
      "web": "https://www.arcee.ai"
    },
    "Argil": {
      "desc": "Short social videos featuring an avatar clone of you.",
      "web": "https://www.argil.ai"
    },
    "Arista": {
      "desc": "Ethernet switches and network software for data centers and AI clusters.",
      "web": "https://www.arista.com"
    },
    "Arize": {
      "desc": "Platform for tracing, evaluating and monitoring ML models and LLM apps.",
      "web": "https://arize.com"
    },
    "Arm": {
      "desc": "Licenses processor designs and instruction set used in phones, servers and AI chips.",
      "web": "https://www.arm.com"
    },
    "Arthur AI": {
      "desc": "Platform for monitoring, evaluating and governing AI models and agents.",
      "web": "https://www.arthur.ai"
    },
    "Artisan": {
      "desc": "AI sales agents that run outbound prospecting and email campaigns.",
      "web": "https://www.artisan.co"
    },
    "Aryn": {
      "desc": "Parses and searches large collections of unstructured documents.",
      "web": "https://www.aryn.ai"
    },
    "ASE Group": {
      "desc": "Largest outsourced chip packaging and testing company, based in Taiwan.",
      "web": "https://www.aseglobal.com"
    },
    "Ash": {
      "desc": "Chat and voice app for mental health support, built on a psychology model.",
      "web": "https://www.talktoash.com"
    },
    "Ask Photos": {
      "desc": "Google Photos feature for searching your photos by asking questions.",
      "web": "https://photos.google.com"
    },
    "ASML": {
      "desc": "Sole maker of extreme ultraviolet lithography machines used to print advanced chips.",
      "web": "https://www.asml.com"
    },
    "AssemblyAI": {
      "desc": "Speech-to-text and audio understanding APIs for developers.",
      "web": "https://www.assemblyai.com"
    },
    "Associated Press": {
      "desc": "Nonprofit news agency that licenses its news archive to AI companies.",
      "web": "https://www.ap.org"
    },
    "Assort Health": {
      "desc": "Voice agents that answer patient calls and book appointments for clinics.",
      "web": "https://www.assorthealth.com"
    },
    "Astera Labs": {
      "desc": "Connectivity chips that link GPUs, CPUs and memory in AI servers.",
      "web": "https://www.asteralabs.com"
    },
    "Atlas Vector Search": {
      "desc": "MongoDB's built-in vector search for its Atlas database.",
      "web": "https://www.mongodb.com/products/platform/atlas-vector-search"
    },
    "Atomicwork": {
      "desc": "IT service management platform where assistants handle employee support requests.",
      "web": "https://www.atomicwork.com"
    },
    "Audible AI narration": {
      "desc": "Amazon's synthetic voice narration for audiobooks on Audible.",
      "web": "https://www.audible.com"
    },
    "Augment Code": {
      "desc": "Coding agent and assistant built to understand large company codebases.",
      "web": "https://www.augmentcode.com"
    },
    "Aurora Innovation": {
      "desc": "Self-driving system for long-haul freight trucks.",
      "web": "https://aurora.tech"
    },
    "Auth0 for AI Agents": {
      "desc": "Okta's authentication and authorization tools for AI agents.",
      "web": "https://auth0.com/ai"
    },
    "AWS": {
      "desc": "Amazon's cloud platform offering compute, storage, GPUs and AI services.",
      "web": "https://aws.amazon.com"
    },
    "AWS Inferentia": {
      "desc": "Amazon's custom chips for running AI model inference on AWS.",
      "web": "https://aws.amazon.com/machine-learning/inferentia/"
    },
    "AWS Trainium": {
      "desc": "Amazon's custom chips for training AI models on AWS.",
      "web": "https://aws.amazon.com/machine-learning/trainium/"
    },
    "Axel Springer": {
      "desc": "German media group whose news content is licensed to AI companies.",
      "web": "https://www.axelspringer.com"
    },
    "Axelera AI": {
      "desc": "European AI inference chips and accelerator cards for edge computer vision.",
      "web": "https://axelera.ai"
    },
    "Axolotl": {
      "desc": "Open-source tool for fine-tuning language models with simple config files.",
      "web": "https://axolotl.ai"
    },
    "Ayar Labs": {
      "desc": "Optical chips that move data between AI chips using light instead of copper.",
      "web": "https://ayarlabs.com"
    },
    "Azure AI Foundry": {
      "desc": "Microsoft Azure's platform for accessing models and building AI apps.",
      "web": "https://ai.azure.com"
    },
    "Azure Machine Learning": {
      "desc": "Microsoft Azure's service for training, tracking, and deploying models.",
      "web": "https://azure.microsoft.com/en-us/products/machine-learning"
    },
    "Baidu AI Cloud": {
      "desc": "Baidu's cloud platform offering compute, its own AI chips and Ernie models.",
      "web": "https://intl.cloud.baidu.com"
    },
    "Baidu ERNIE": {
      "desc": "Baidu's family of large language models behind its chatbot.",
      "web": "https://yiyan.baidu.com"
    },
    "BAML": {
      "desc": "Language for defining typed LLM functions with structured, reliable outputs.",
      "web": "https://boundaryml.com"
    },
    "Base44": {
      "desc": "Builds working apps with databases and logins from chat prompts.",
      "web": "https://base44.com"
    },
    "Baseten": {
      "desc": "Platform for deploying and serving AI models in production.",
      "web": "https://www.baseten.co"
    },
    "Basis": {
      "desc": "Assistant agents that do bookkeeping, tax and close work for accounting firms.",
      "web": "https://www.getbasis.ai"
    },
    "Be My Eyes": {
      "desc": "App connecting blind users to volunteers and an image-describing assistant.",
      "web": "https://www.bemyeyes.com"
    },
    "Beam": {
      "desc": "Serverless platform that runs Python code and models on cloud GPUs.",
      "web": "https://www.beam.cloud"
    },
    "Beatoven.ai": {
      "desc": "Royalty-free background music generated for videos and podcasts.",
      "web": "https://www.beatoven.ai"
    },
    "Beautiful.ai": {
      "desc": "Presentation software that designs slides automatically as you add content.",
      "web": "https://www.beautiful.ai"
    },
    "Bee": {
      "desc": "Wrist wearable that records conversations and turns them into notes and reminders.",
      "web": "https://www.bee.computer"
    },
    "BentoML": {
      "desc": "Platform and open-source framework for deploying AI models as APIs.",
      "web": "https://www.bentoml.com"
    },
    "Besi": {
      "desc": "Die-attach and hybrid bonding equipment for advanced chip packaging.",
      "web": "https://www.besi.com"
    },
    "Bespoke Labs": {
      "desc": "Tools and datasets for curating synthetic data and RL environments.",
      "web": "https://www.bespokelabs.ai"
    },
    "BetterUp": {
      "desc": "Workplace coaching platform pairing human coaches with an assistant coach.",
      "web": "https://www.betterup.com"
    },
    "Biren Technology": {
      "desc": "Chinese designer of general-purpose GPUs for AI training and inference.",
      "web": "https://www.birentech.com"
    },
    "Black Forest Labs": {
      "desc": "Makers of the FLUX image generation models.",
      "web": "https://bfl.ai"
    },
    "Bland AI": {
      "desc": "AI phone agents that handle inbound and outbound calls for enterprises.",
      "web": "https://www.bland.ai"
    },
    "Bloom Energy": {
      "desc": "Solid-oxide fuel cells that generate on-site power for data centers and businesses.",
      "web": "https://www.bloomenergy.com"
    },
    "Blue Yonder": {
      "desc": "Supply chain planning, warehouse and logistics software.",
      "web": "https://blueyonder.com"
    },
    "Bolt": {
      "desc": "Builds and deploys full-stack web apps from chat prompts in the browser.",
      "web": "https://bolt.new"
    },
    "Boomy": {
      "desc": "App for making and releasing generated songs.",
      "web": "https://boomy.com"
    },
    "Boston Dynamics": {
      "desc": "Builds mobile robots such as the Spot robot dog and Atlas humanoid.",
      "web": "https://bostondynamics.com"
    },
    "Botika": {
      "desc": "Generated fashion model photos for clothing retailers.",
      "web": "https://botika.io"
    },
    "Botpress": {
      "desc": "Platform for building AI chatbots and agents for customer support.",
      "web": "https://botpress.com"
    },
    "Brainly": {
      "desc": "Homework help platform where students get answers and explanations.",
      "web": "https://brainly.com"
    },
    "Braintrust": {
      "desc": "Platform for evaluating, testing and monitoring LLM apps and agents.",
      "web": "https://www.braintrust.dev"
    },
    "Brave Search API": {
      "desc": "Brave's API for searching its own independent web index.",
      "web": "https://brave.com/search/api/"
    },
    "Bria AI": {
      "desc": "Image generation models trained only on licensed content.",
      "web": "https://bria.ai"
    },
    "Bright Data": {
      "desc": "Proxy network and web scraping tools for collecting public web data.",
      "web": "https://brightdata.com"
    },
    "Bright Machines": {
      "desc": "Robotic microfactories and software that automate electronics assembly.",
      "web": "https://www.brightmachines.com"
    },
    "Brightband": {
      "desc": "Builds AI weather forecasting models for businesses and the public.",
      "web": "https://www.brightband.com"
    },
    "Brightwave": {
      "desc": "Research assistant that analyzes financial filings and market data for investors.",
      "web": "https://www.brightwave.io"
    },
    "Broadcom": {
      "desc": "Networking chips, custom AI chips and infrastructure software, including VMware.",
      "web": "https://www.broadcom.com"
    },
    "Broadcom XPUs": {
      "desc": "Custom AI chips Broadcom designs with hyperscalers such as Google and Meta.",
      "web": "https://www.broadcom.com"
    },
    "Brookfield Renewable": {
      "desc": "Owner and operator of hydro, wind and solar plants that sells clean power.",
      "web": "https://www.brookfieldrenewable.com"
    },
    "Browser Use": {
      "desc": "Open-source library and cloud that let AI agents control web browsers.",
      "web": "https://browser-use.com"
    },
    "Browserbase": {
      "desc": "Headless browsers in the cloud for AI agents and automation.",
      "web": "https://www.browserbase.com"
    },
    "Browserless": {
      "desc": "Hosted headless browsers for scraping, testing and automation.",
      "web": "https://www.browserless.io"
    },
    "Bugbot": {
      "desc": "Cursor's automated pull request reviewer that finds bugs.",
      "web": "https://cursor.com/bugbot"
    },
    "ByteDance Seed": {
      "desc": "ByteDance's research team building the Seed and Doubao foundation models.",
      "web": "https://seed.bytedance.com"
    },
    "C2PA": {
      "desc": "Industry coalition setting the open standard for content origin metadata.",
      "web": "https://c2pa.org"
    },
    "Cadence": {
      "desc": "Electronic design automation software and IP used to design and verify chips.",
      "web": "https://www.cadence.com"
    },
    "CAISY": {
      "desc": "Skillsoft coach for role-playing business conversations and getting feedback.",
      "web": "https://www.skillsoft.com"
    },
    "CalypsoAI": {
      "desc": "Security guardrails and red-teaming for generative AI apps, now part of F5.",
      "web": "https://www.calypsoai.com"
    },
    "Cambricon": {
      "desc": "Chinese designer of AI chips for data centers and edge devices.",
      "web": "https://www.cambricon.com"
    },
    "CAMEL-AI": {
      "desc": "Open-source community framework for researching and building multi-agent systems.",
      "web": "https://www.camel-ai.org"
    },
    "Canva AI": {
      "desc": "Canva's generation tools for designs, images, text and documents.",
      "web": "https://www.canva.com/ai-assistant"
    },
    "CapCut": {
      "desc": "ByteDance's video editor for phones, desktop and web.",
      "web": "https://www.capcut.com"
    },
    "Captions": {
      "desc": "Mobile video editor that adds captions, edits and generates talking videos.",
      "web": "https://www.captions.ai"
    },
    "Carbon Robotics": {
      "desc": "Tractor-pulled machines that use lasers and vision to kill weeds.",
      "web": "https://carbonrobotics.com"
    },
    "Cartesia": {
      "desc": "Fast, realistic text-to-speech and speech recognition models for voice apps.",
      "web": "https://cartesia.ai"
    },
    "Caterpillar": {
      "desc": "Construction machinery plus diesel and gas generators used for data center power.",
      "web": "https://www.caterpillar.com"
    },
    "Causaly": {
      "desc": "Research tool that maps biomedical literature for drug discovery teams.",
      "web": "https://www.causaly.com"
    },
    "Celestial AI": {
      "desc": "Photonic interconnect that links AI chips and memory, now part of Marvell.",
      "web": "https://www.celestial.ai"
    },
    "Celestica": {
      "desc": "Contract manufacturer of networking switches, servers and storage hardware.",
      "web": "https://www.celestica.com"
    },
    "Centaur Labs": {
      "desc": "Medical and scientific data labeling by a network of expert annotators.",
      "web": "https://centaur.ai"
    },
    "CentML": {
      "desc": "Software that cut model serving costs, now part of Nvidia.",
      "web": "https://www.nvidia.com"
    },
    "Cerebras": {
      "desc": "Wafer-scale chips and a cloud service for fast AI training and inference.",
      "web": "https://www.cerebras.ai"
    },
    "Cerebras Inference": {
      "desc": "Cerebras' cloud API for very fast inference on its wafer-scale chips.",
      "web": "https://www.cerebras.ai/inference"
    },
    "Cerebrium": {
      "desc": "Serverless GPU platform for deploying machine learning models with fast startup.",
      "web": "https://www.cerebrium.ai"
    },
    "Chai": {
      "desc": "App for chatting with user-made chatbot characters.",
      "web": "https://www.chai-research.com"
    },
    "Chai Discovery": {
      "desc": "Models that predict molecular structures and design antibodies for drugs.",
      "web": "https://www.chaidiscovery.com"
    },
    "Character.ai": {
      "desc": "App for chatting and role-playing with user-created characters.",
      "web": "https://character.ai"
    },
    "ChatGPT": {
      "desc": "OpenAI's chat assistant for writing, questions, coding and tasks.",
      "web": "https://chatgpt.com"
    },
    "ChatGPT agent mode": {
      "desc": "ChatGPT mode that uses its own browser to complete tasks for you.",
      "web": "https://chatgpt.com"
    },
    "ChatGPT Atlas": {
      "desc": "OpenAI's web browser with ChatGPT built in to read and act on pages.",
      "web": "https://chatgpt.com/atlas"
    },
    "ChatGPT deep research": {
      "desc": "ChatGPT feature that researches the web for minutes and writes cited reports.",
      "web": "https://chatgpt.com"
    },
    "ChatGPT study mode": {
      "desc": "ChatGPT mode that guides students step by step instead of giving answers.",
      "web": "https://chatgpt.com"
    },
    "Checkstep": {
      "desc": "Content moderation software that flags harmful posts for online platforms.",
      "web": "https://www.checkstep.com"
    },
    "Chroma": {
      "desc": "Open-source database for storing embeddings and searching them.",
      "web": "https://www.trychroma.com"
    },
    "Ciena": {
      "desc": "Optical networking equipment that links data centers over long distances.",
      "web": "https://www.ciena.com"
    },
    "Cinder": {
      "desc": "Operations software for trust and safety teams that review content.",
      "web": "https://www.cinder.co"
    },
    "Cisco": {
      "desc": "Networking equipment, security and collaboration software, including AI data center switches.",
      "web": "https://www.cisco.com"
    },
    "Civitai": {
      "desc": "Community site for sharing image models and generating images.",
      "web": "https://civitai.com"
    },
    "Claude": {
      "desc": "Anthropic's AI assistant for writing, analysis, coding and research.",
      "web": "https://claude.ai"
    },
    "Claude Agent SDK": {
      "desc": "Anthropic's library for building agents on the same harness as Claude Code.",
      "web": "https://docs.anthropic.com/en/docs/agent-sdk/overview"
    },
    "Claude Code": {
      "desc": "Anthropic's coding agent that works in your terminal, IDE and codebase.",
      "web": "https://www.claude.com/product/claude-code"
    },
    "Claude for Chrome": {
      "desc": "Chrome extension that lets Claude navigate websites and complete tasks.",
      "web": "https://claude.ai/chrome"
    },
    "Clay": {
      "desc": "Spreadsheet-style tool that enriches sales leads with data and AI.",
      "web": "https://www.clay.com"
    },
    "Cleanlab": {
      "desc": "Finds and fixes errors in datasets and unreliable AI agent outputs.",
      "web": "https://cleanlab.ai"
    },
    "ClearML": {
      "desc": "Open-source platform for MLOps, experiment tracking, and GPU cluster management.",
      "web": "https://klique.ai"
    },
    "Cleerly": {
      "desc": "Heart scan analysis that measures plaque in coronary arteries.",
      "web": "https://cleerly.com"
    },
    "Clika": {
      "desc": "Automatically compresses AI models for faster deployment on devices.",
      "web": "https://www.clika.io"
    },
    "Cline": {
      "desc": "Open-source coding agent that runs inside VS Code and other editors.",
      "web": "https://cline.bot"
    },
    "CloudFactory": {
      "desc": "Managed workforce for data labeling and AI training data.",
      "web": "https://www.cloudfactory.com"
    },
    "Coactive AI": {
      "desc": "Searches and tags large image and video libraries for media companies.",
      "web": "https://coactive.ai"
    },
    "CoCounsel": {
      "desc": "Thomson Reuters assistant for legal research, drafting and document review.",
      "web": "https://legal.thomsonreuters.com/en/c/cocounsel"
    },
    "CodeRabbit": {
      "desc": "Automated code review comments on pull requests.",
      "web": "https://www.coderabbit.ai"
    },
    "CodeSandbox": {
      "desc": "Cloud development environments and sandboxes for running code, now part of Together AI.",
      "web": "https://codesandbox.io"
    },
    "Codex": {
      "desc": "OpenAI's coding agent that writes, fixes and reviews code in the cloud or locally.",
      "web": "https://openai.com/codex/"
    },
    "Cognee": {
      "desc": "Open-source memory layer that turns data into knowledge graphs for agents.",
      "web": "https://www.cognee.ai"
    },
    "Cohere Command": {
      "desc": "Cohere's language models built for enterprise business tasks.",
      "web": "https://cohere.com/command"
    },
    "Cohere Embed and Rerank": {
      "desc": "Cohere's models that turn text into vectors and reorder search results.",
      "web": "https://cohere.com/embed"
    },
    "Cohere Health": {
      "desc": "Prior authorization automation for health plans and providers.",
      "web": "https://www.coherehealth.com"
    },
    "Coherent": {
      "desc": "Optical transceivers, lasers and materials for data center networks.",
      "web": "https://www.coherent.com"
    },
    "Colossal-AI": {
      "desc": "Open-source system for training and serving large models in parallel.",
      "web": "https://hpc-ai.com"
    },
    "Colossyan": {
      "desc": "Training and explainer videos with digital avatars.",
      "web": "https://www.colossyan.com"
    },
    "Comet": {
      "desc": "Tracks experiments and evaluates LLM applications.",
      "web": "https://www.comet.com"
    },
    "Common Crawl": {
      "desc": "Nonprofit that crawls the web and releases free open datasets.",
      "web": "https://commoncrawl.org"
    },
    "Commonwealth Fusion Systems": {
      "desc": "MIT spin-out building tokamak fusion power plants with high-temperature superconducting magnets.",
      "web": "https://cfs.energy"
    },
    "Composer": {
      "desc": "Databricks' open-source library for efficient large-scale model training.",
      "web": "https://github.com/mosaicml/composer"
    },
    "Composio": {
      "desc": "Platform that connects AI agents to hundreds of apps with managed authentication.",
      "web": "https://composio.dev"
    },
    "Confident AI (DeepEval)": {
      "desc": "DeepEval open-source testing framework and cloud for evaluating LLM apps.",
      "web": "https://www.confident-ai.com"
    },
    "Consensus": {
      "desc": "Search engine that answers questions from scientific research papers.",
      "web": "https://consensus.app"
    },
    "Constellation Energy": {
      "desc": "Largest US nuclear power producer, selling carbon-free electricity to utilities and data centers.",
      "web": "https://www.constellationenergy.com"
    },
    "Content Credentials": {
      "desc": "Adobe-led labels showing who made a piece of content and how.",
      "web": "https://contentcredentials.org"
    },
    "Continue": {
      "desc": "Open-source coding assistant and agents for IDEs and CI.",
      "web": "https://www.continue.dev"
    },
    "Convai": {
      "desc": "Conversational characters for games and virtual worlds.",
      "web": "https://www.convai.com"
    },
    "CoolIT Systems": {
      "desc": "Direct-to-chip liquid cooling systems for servers and GPUs, now owned by Ecolab.",
      "web": "https://www.coolitsystems.com"
    },
    "Copilot autocomplete": {
      "desc": "GitHub Copilot's inline code suggestions as you type.",
      "web": "https://github.com/features/copilot"
    },
    "Copilot coding agent": {
      "desc": "GitHub agent that takes issues and opens pull requests with code changes.",
      "web": "https://github.com/features/copilot"
    },
    "Copilot Studio": {
      "desc": "Microsoft's low-code tool for building custom copilots and agents.",
      "web": "https://www.microsoft.com/en-us/microsoft-copilot/microsoft-copilot-studio"
    },
    "Copy.ai": {
      "desc": "Marketing and sales content generation and workflow tool.",
      "web": "https://www.copy.ai"
    },
    "Core ML": {
      "desc": "Apple's framework for running models inside iPhone and Mac apps.",
      "web": "https://developer.apple.com/machine-learning/core-ml/"
    },
    "Core Scientific": {
      "desc": "Former bitcoin miner that converts its sites into high-density data centers for AI.",
      "web": "https://corescientific.com"
    },
    "Core42": {
      "desc": "G42's sovereign cloud and AI infrastructure business in the UAE.",
      "web": "https://www.core42.ai"
    },
    "CoreWeave": {
      "desc": "GPU cloud built for AI training and inference at large scale.",
      "web": "https://www.coreweave.com"
    },
    "Cornelis Networks": {
      "desc": "Omni-Path high-performance networking for AI and supercomputing clusters.",
      "web": "https://www.cornelisnetworks.com"
    },
    "Cosmos": {
      "desc": "Nvidia's world models for generating physical simulations for robots and cars.",
      "web": "https://www.nvidia.com/en-us/ai/cosmos/"
    },
    "Coval": {
      "desc": "Simulation and evaluation for testing voice and chat agents.",
      "web": "https://www.coval.dev"
    },
    "Coveo": {
      "desc": "Search and recommendation engine for websites, shops and support portals.",
      "web": "https://www.coveo.com"
    },
    "Created by Humans": {
      "desc": "Licenses books from authors and publishers for AI training.",
      "web": "https://www.createdbyhumans.ai"
    },
    "Creatify": {
      "desc": "Short video ads generated from product links.",
      "web": "https://creatify.ai"
    },
    "Credal": {
      "desc": "Secure platform for connecting company data and tools to agents.",
      "web": "https://www.credal.ai"
    },
    "Credo": {
      "desc": "High-speed connectivity chips and active electrical cables for data centers.",
      "web": "https://credosemi.com"
    },
    "Credo AI": {
      "desc": "Software for tracking AI risk, compliance and policy across a company.",
      "web": "https://www.credo.ai"
    },
    "Crescendo": {
      "desc": "Outsourced customer service combining AI agents with human staff.",
      "web": "https://www.crescendo.ai"
    },
    "Cresta": {
      "desc": "AI that assists and automates contact-center agent conversations.",
      "web": "https://cresta.com"
    },
    "CrewAI": {
      "desc": "Open-source framework and platform for teams of cooperating AI agents.",
      "web": "https://www.crewai.com"
    },
    "Crusoe": {
      "desc": "Builds data centers on cheap energy and rents GPU cloud capacity.",
      "web": "https://crusoe.ai"
    },
    "CSM": {
      "desc": "Generates 3D models and game assets from images and text.",
      "web": "https://www.csm.ai"
    },
    "CUDA": {
      "desc": "Nvidia's CUDA (Compute Unified Device Architecture) platform for running code on its GPUs.",
      "web": "https://developer.nvidia.com/cuda-toolkit"
    },
    "Cummins": {
      "desc": "Engines and backup generators, including standby power for data centers.",
      "web": "https://www.cummins.com"
    },
    "Cursor agent": {
      "desc": "Agent mode in the Cursor code editor that makes multi-file code changes.",
      "web": "https://cursor.com"
    },
    "Cursor Tab": {
      "desc": "Cursor's editor feature that predicts your next code edits.",
      "web": "https://cursor.com"
    },
    "CuspAI": {
      "desc": "Uses AI models to discover new materials, such as carbon-capture compounds.",
      "web": "https://www.cusp.ai"
    },
    "CyrusOne": {
      "desc": "Data center developer and operator serving hyperscale and enterprise customers.",
      "web": "https://www.cyrusone.com"
    },
    "Cytora": {
      "desc": "Reads and triages commercial insurance submissions for underwriters.",
      "web": "https://cytora.com"
    },
    "D-ID": {
      "desc": "Talking avatars and video agents generated from photos.",
      "web": "https://www.d-id.com"
    },
    "d-Matrix": {
      "desc": "In-memory computing chips for efficient generative AI inference in data centers.",
      "web": "https://www.d-matrix.ai"
    },
    "Darktrace": {
      "desc": "Cybersecurity that learns normal network activity and flags threats.",
      "web": "https://www.darktrace.com"
    },
    "Dashworks": {
      "desc": "Assistant that answers questions from a company's documents and apps.",
      "web": "https://www.dashworks.ai"
    },
    "Databricks Genie": {
      "desc": "Lets business users ask questions of Databricks data in plain English.",
      "web": "https://www.databricks.com/product/business-intelligence/ai-bi-genie"
    },
    "Datacurve": {
      "desc": "Expert software-engineering and coding data for training frontier models.",
      "web": "https://datacurve.ai"
    },
    "Datalab (Marker)": {
      "desc": "Open-source tools and API for converting PDFs into clean text.",
      "web": "https://www.datalab.to"
    },
    "DatologyAI": {
      "desc": "Automatically selects and curates the best data for training models.",
      "web": "https://www.datologyai.com"
    },
    "Daytona": {
      "desc": "Fast, secure sandboxes for running code generated by AI.",
      "web": "https://www.daytona.io"
    },
    "DBOS": {
      "desc": "Library that makes programs durable by checkpointing their state in Postgres.",
      "web": "https://www.dbos.dev"
    },
    "DDN": {
      "desc": "High-performance storage systems for AI and supercomputing clusters.",
      "web": "https://www.ddn.com"
    },
    "Decagon": {
      "desc": "AI agents that handle customer support chats, emails and calls.",
      "web": "https://decagon.ai"
    },
    "Decart": {
      "desc": "Real-time video generation and interactive world models.",
      "web": "https://decart.ai"
    },
    "Deepgram": {
      "desc": "Speech-to-text, text-to-speech, and voice agent APIs.",
      "web": "https://deepgram.com"
    },
    "DeepInfra": {
      "desc": "Low-cost cloud API for running open models.",
      "web": "https://deepinfra.com"
    },
    "DeepL": {
      "desc": "Machine translation and writing tools for people and businesses.",
      "web": "https://www.deepl.com"
    },
    "DeepScribe": {
      "desc": "Medical scribe that writes clinical notes from patient visits.",
      "web": "https://www.deepscribe.ai"
    },
    "DeepSeek": {
      "desc": "Chinese lab releasing low-cost open-weight reasoning and chat models.",
      "web": "https://www.deepseek.com"
    },
    "DeepSeek app": {
      "desc": "DeepSeek's free chatbot app powered by its own models.",
      "web": "https://chat.deepseek.com"
    },
    "DeepSpeed": {
      "desc": "Microsoft's library for training very large models across many GPUs.",
      "web": "https://www.deepspeed.ai"
    },
    "Defined.ai": {
      "desc": "Marketplace for licensed speech, text, image, and video training data.",
      "web": "https://www.defined.ai"
    },
    "Dell": {
      "desc": "PCs, servers and storage, including GPU servers for AI.",
      "web": "https://www.dell.com"
    },
    "Denvr Dataworks": {
      "desc": "GPU cloud offering clusters and inference services for AI workloads.",
      "web": "https://www.denvr.com"
    },
    "Descope": {
      "desc": "Drag-and-drop authentication and identity flows for apps and AI agents.",
      "web": "https://www.descope.com"
    },
    "Descript": {
      "desc": "Video and podcast editor that edits media by editing the transcript.",
      "web": "https://www.descript.com"
    },
    "Deutsche Telekom Industrial AI Cloud": {
      "desc": "Deutsche Telekom's Nvidia-based AI cloud in Germany for European industry.",
      "web": "https://www.telekom.com"
    },
    "Devin": {
      "desc": "Autonomous agent that takes software tasks and opens pull requests.",
      "web": "https://devin.ai"
    },
    "Dexterity": {
      "desc": "Robots that load trucks and handle parcels in warehouses.",
      "web": "https://www.dexterity.ai"
    },
    "Dia": {
      "desc": "Web browser with a built-in assistant that chats about your open tabs.",
      "web": "https://www.diabrowser.com"
    },
    "Diffbot": {
      "desc": "Extracts structured data from web pages and builds a web knowledge graph.",
      "web": "https://www.diffbot.com"
    },
    "Dify": {
      "desc": "Open-source platform for building LLM apps, workflows and RAG pipelines.",
      "web": "https://dify.ai"
    },
    "Digimarc": {
      "desc": "Digital watermarks for products, packaging and media authentication.",
      "web": "https://www.digimarc.com"
    },
    "Digital Realty": {
      "desc": "Data center real estate company offering colocation and large wholesale campuses worldwide.",
      "web": "https://www.digitalrealty.com"
    },
    "DigitalOcean": {
      "desc": "Simple cloud platform for developers and small businesses, now including GPUs.",
      "web": "https://www.digitalocean.com"
    },
    "Digits": {
      "desc": "Accounting software that books transactions and keeps ledgers for small businesses automatically.",
      "web": "https://digits.com"
    },
    "Diligent Robotics": {
      "desc": "Builds Moxi, a robot that fetches and delivers supplies in hospitals.",
      "web": "https://www.diligentrobots.com"
    },
    "Docling": {
      "desc": "IBM's open-source tool for converting documents into structured text.",
      "web": "https://www.docling.ai"
    },
    "Document AI": {
      "desc": "Google Cloud service for extracting data from documents.",
      "web": "https://cloud.google.com/document-ai"
    },
    "Document Intelligence": {
      "desc": "Azure service for extracting text, tables, and fields from documents.",
      "web": "https://azure.microsoft.com/en-us/products/ai-services/ai-document-intelligence"
    },
    "Dominion Energy": {
      "desc": "Regulated utility serving Virginia and the Carolinas, home to the largest data center market.",
      "web": "https://www.dominionenergy.com"
    },
    "Doubao": {
      "desc": "ByteDance's popular chatbot app in China.",
      "web": "https://www.doubao.com"
    },
    "Doximity GPT": {
      "desc": "Doximity's assistant that drafts medical letters and answers clinical questions.",
      "web": "https://www.doximity.com/gpt"
    },
    "DraftWise": {
      "desc": "Contract drafting tool that draws on a law firm's past deals.",
      "web": "https://www.draftwise.com"
    },
    "Dragon Copilot": {
      "desc": "Microsoft's clinical assistant for dictation and automatic visit notes.",
      "web": "https://www.microsoft.com/en-us/health-solutions/clinical-workflow/dragon-copilot"
    },
    "Dream Machine": {
      "desc": "Luma's tool for generating videos and images from prompts.",
      "web": "https://lumalabs.ai/dream-machine"
    },
    "DSPy": {
      "desc": "Open-source framework for programming and optimizing LLM prompts in code.",
      "web": "https://dspy.ai"
    },
    "dstack": {
      "desc": "Open-source orchestration for AI containers across clouds and on-prem GPUs.",
      "web": "https://dstack.ai"
    },
    "Duality Robotics": {
      "desc": "Digital twin simulator that generates synthetic data for robots and vision.",
      "web": "https://www.duality.ai"
    },
    "Dubverse": {
      "desc": "Video dubbing and subtitling into many languages.",
      "web": "https://dubverse.ai"
    },
    "Duke Energy": {
      "desc": "Regulated electric and gas utility serving the Carolinas, Florida and the Midwest.",
      "web": "https://www.duke-energy.com"
    },
    "Duolingo Max": {
      "desc": "Duolingo subscription tier with chat role-play and answer explanations.",
      "web": "https://www.duolingo.com/max"
    },
    "Dyna Robotics": {
      "desc": "Builds robot foundation models for commercial manipulation tasks like folding.",
      "web": "https://www.dyna.co"
    },
    "Dynamo": {
      "desc": "Nvidia's open-source framework for serving models across many GPUs.",
      "web": "https://developer.nvidia.com/dynamo"
    },
    "E2B": {
      "desc": "Cloud sandboxes where AI agents can safely run code.",
      "web": "https://e2b.dev"
    },
    "E2E Networks": {
      "desc": "Indian cloud provider renting GPU servers for AI training and inference.",
      "web": "https://www.e2enetworks.com"
    },
    "Earth-2": {
      "desc": "Nvidia's platform for AI weather and climate simulation.",
      "web": "https://www.nvidia.com/en-us/high-performance-computing/earth-2/"
    },
    "Eaton": {
      "desc": "Electrical power equipment such as switchgear, UPS systems and power distribution.",
      "web": "https://www.eaton.com"
    },
    "Ebb": {
      "desc": "Headspace's chat companion for reflection and mental health support.",
      "web": "https://www.headspace.com"
    },
    "EdgeCore Digital Infrastructure": {
      "desc": "Developer of hyperscale data center campuses for large cloud providers.",
      "web": "https://edgecore.com"
    },
    "EdgeCortix": {
      "desc": "Edge AI processors and compiler software for running models on devices.",
      "web": "https://www.edgecortix.com"
    },
    "Eightfold AI": {
      "desc": "Talent platform that matches and ranks candidates and employees for roles.",
      "web": "https://eightfold.ai"
    },
    "Elasticsearch": {
      "desc": "Search engine that also stores and queries vectors.",
      "web": "https://www.elastic.co/elasticsearch"
    },
    "Elementary": {
      "desc": "Machine vision inspection systems for factory quality control.",
      "web": "https://www.elementaryml.com"
    },
    "Eleven Music": {
      "desc": "ElevenLabs' music generation model for licensed songs.",
      "web": "https://elevenlabs.io/music"
    },
    "ElevenLabs": {
      "desc": "Realistic text-to-speech, voice cloning, and voice agent tools.",
      "web": "https://elevenlabs.io"
    },
    "ElevenLabs Dubbing": {
      "desc": "ElevenLabs' tool that dubs video and audio into other languages.",
      "web": "https://elevenlabs.io/dubbing"
    },
    "ElevenReader": {
      "desc": "ElevenLabs' app that reads books, articles and documents aloud.",
      "web": "https://elevenreader.io"
    },
    "Elicit": {
      "desc": "Research assistant that finds, summarizes and extracts data from academic papers.",
      "web": "https://elicit.com"
    },
    "EliseAI": {
      "desc": "Agents that answer leasing and resident questions for property managers and clinics.",
      "web": "https://www.eliseai.com"
    },
    "Ello": {
      "desc": "Reading tutor app that listens to children read aloud and helps them.",
      "web": "https://www.ello.com"
    },
    "Emergent": {
      "desc": "Builds and deploys full-stack apps from chat prompts using agents.",
      "web": "https://emergent.sh"
    },
    "Encord": {
      "desc": "Data platform for labeling and curating image, video, and sensor data.",
      "web": "https://encord.com"
    },
    "Enfabrica": {
      "desc": "Networking chips that connect GPUs, memory and network into one fabric.",
      "web": "https://enfabrica.net"
    },
    "Entergy": {
      "desc": "Electric utility serving Arkansas, Louisiana, Mississippi and Texas with nuclear and gas generation.",
      "web": "https://www.entergy.com"
    },
    "Enzai": {
      "desc": "Software for managing AI risk and compliance across an organization.",
      "web": "https://www.enz.ai"
    },
    "Equinix": {
      "desc": "Global operator of colocation data centers and interconnection exchanges.",
      "web": "https://www.equinix.com"
    },
    "ERNIE Bot": {
      "desc": "Baidu's chat assistant built on its ERNIE models.",
      "web": "https://yiyan.baidu.com"
    },
    "Estuary": {
      "desc": "Platform for real-time data pipelines between databases and apps.",
      "web": "https://estuary.dev"
    },
    "Etched": {
      "desc": "A chip built only for transformer models.",
      "web": "https://www.etched.com"
    },
    "EvenUp": {
      "desc": "Demand letters and case documents for personal injury lawyers.",
      "web": "https://www.evenuplaw.com"
    },
    "EvolutionaryScale": {
      "desc": "Builds ESM protein language models for designing new proteins.",
      "web": "https://www.evolutionaryscale.ai"
    },
    "Exa": {
      "desc": "Web search API built for AI agents and apps.",
      "web": "https://exa.ai"
    },
    "ExecuTorch": {
      "desc": "Meta's runtime for running PyTorch models on phones and edge devices.",
      "web": "https://pytorch.org/executorch"
    },
    "Extend": {
      "desc": "Platform for extracting and processing data from business documents.",
      "web": "https://www.extend.ai"
    },
    "Fabi.ai": {
      "desc": "Analytics platform for ad hoc analysis and dashboards with an assistant.",
      "web": "https://www.fabi.ai"
    },
    "Factory": {
      "desc": "Coding agents, called Droids, that handle software tasks across tools.",
      "web": "https://factory.ai"
    },
    "FairNow": {
      "desc": "Software for AI governance, risk checks and bias audits.",
      "web": "https://fairnow.ai"
    },
    "fal.ai": {
      "desc": "Cloud API for fast image, video, and audio generation models.",
      "web": "https://fal.ai"
    },
    "FalkorDB": {
      "desc": "Low-latency graph database built for knowledge graphs and GraphRAG.",
      "web": "https://www.falkordb.com"
    },
    "Farama Foundation": {
      "desc": "Nonprofit maintaining Gymnasium and other open-source RL environment libraries.",
      "web": "https://farama.org"
    },
    "Fathom": {
      "desc": "Meeting recorder that writes summaries and action items for video calls.",
      "web": "https://fathom.ai"
    },
    "Featherless AI": {
      "desc": "Serverless API for running many open-weight models.",
      "web": "https://featherless.ai"
    },
    "Featurespace": {
      "desc": "Visa's real-time payment fraud detection software for banks.",
      "web": "https://www.featurespace.com"
    },
    "Federato": {
      "desc": "Underwriting platform that helps insurers pick and price risks.",
      "web": "https://www.federato.ai"
    },
    "Feedzai": {
      "desc": "Fraud and money-laundering detection software for banks and payment firms.",
      "web": "https://www.feedzai.com"
    },
    "Fervo Energy": {
      "desc": "Enhanced geothermal power plants that use drilling techniques from oil and gas.",
      "web": "https://fervoenergy.com"
    },
    "Fiddler AI": {
      "desc": "Platform for monitoring, explaining and controlling ML models and agents.",
      "web": "https://www.fiddler.ai"
    },
    "Field AI": {
      "desc": "Builds AI software that lets robots navigate unmapped outdoor sites.",
      "web": "https://www.fieldai.com"
    },
    "Figma Make": {
      "desc": "Figma's tool that turns prompts and designs into working app prototypes.",
      "web": "https://www.figma.com/make"
    },
    "Figure": {
      "desc": "Builds general-purpose humanoid robots for factory and home work.",
      "web": "https://www.figure.ai"
    },
    "Figure Helix": {
      "desc": "Figure's vision-language-action model that controls its humanoid robots.",
      "web": "https://www.figure.ai"
    },
    "FineWeb datasets": {
      "desc": "Large open web-text datasets from Hugging Face for training language models.",
      "web": "https://huggingface.co/datasets/HuggingFaceFW/fineweb"
    },
    "Fintool": {
      "desc": "Research assistant for investors that answers questions from company filings.",
      "web": "https://fintool.com"
    },
    "Firecrawl": {
      "desc": "Crawls and scrapes websites into clean data for LLMs.",
      "web": "https://www.firecrawl.dev"
    },
    "Fireflies.ai": {
      "desc": "Meeting recorder that transcribes, summarizes and searches calls.",
      "web": "https://fireflies.ai"
    },
    "Firefly": {
      "desc": "Adobe's image, video and audio generator trained on licensed content.",
      "web": "https://firefly.adobe.com"
    },
    "Fireworks": {
      "desc": "Cloud service for running and fine-tuning open models fast.",
      "web": "https://fireworks.ai"
    },
    "Firmus": {
      "desc": "Asia-Pacific builder of energy-efficient AI data centers and GPU cloud.",
      "web": "https://firmus.co"
    },
    "Fish Audio": {
      "desc": "Text-to-speech and voice cloning platform with many community voices.",
      "web": "https://fish.audio"
    },
    "Fivetran": {
      "desc": "Managed service that copies data from apps into data warehouses.",
      "web": "https://www.fivetran.com"
    },
    "Flair.ai": {
      "desc": "Product photoshoot generator for e-commerce brands.",
      "web": "https://flair.ai"
    },
    "Flock Safety": {
      "desc": "License plate cameras and public safety software for police and communities.",
      "web": "https://www.flocksafety.com"
    },
    "Flow": {
      "desc": "Google's filmmaking tool for generating and editing video clips with Veo.",
      "web": "https://labs.google/flow"
    },
    "Flowise": {
      "desc": "Open-source visual builder for LLM apps and agents.",
      "web": "https://flowiseai.com"
    },
    "Fluidstack": {
      "desc": "GPU cloud that builds and runs large dedicated clusters for AI labs.",
      "web": "https://www.fluidstack.io"
    },
    "Forethought": {
      "desc": "AI agents for customer support, now part of Zendesk.",
      "web": "https://forethought.ai"
    },
    "Forter": {
      "desc": "Fraud and abuse prevention for e-commerce checkouts and accounts.",
      "web": "https://www.forter.com"
    },
    "Foxconn": {
      "desc": "Contract electronics manufacturer that assembles iPhones and AI server racks.",
      "web": "https://www.foxconn.com"
    },
    "Fractile": {
      "desc": "In-memory compute chips designed to run large language models much faster.",
      "web": "https://www.fractile.ai"
    },
    "Freed": {
      "desc": "Medical scribe for clinicians that writes visit notes.",
      "web": "https://www.getfreed.ai"
    },
    "Freepik AI": {
      "desc": "Freepik's suite of image, video and design generation tools.",
      "web": "https://www.freepik.com/ai"
    },
    "Friend": {
      "desc": "Wearable pendant that listens to your day and chats as a companion.",
      "web": "https://friend.com"
    },
    "FriendliAI": {
      "desc": "Inference cloud and engine for serving models at high throughput.",
      "web": "https://friendli.ai"
    },
    "FuriosaAI": {
      "desc": "South Korean designer of data center AI inference chips.",
      "web": "https://furiosa.ai"
    },
    "G42": {
      "desc": "Abu Dhabi technology group building AI data centers, clouds, and models.",
      "web": "https://www.g42.ai"
    },
    "Galaxy AI": {
      "desc": "Samsung's AI features on Galaxy phones, like translation and photo editing.",
      "web": "https://www.samsung.com/us/galaxy-ai/"
    },
    "Galileo": {
      "desc": "Platform for evaluating and monitoring AI agents, now part of Cisco.",
      "web": "https://galileo.ai"
    },
    "Gamma": {
      "desc": "Creates presentations, documents and websites from a text prompt.",
      "web": "https://gamma.app"
    },
    "GCP": {
      "desc": "Google Cloud Platform, offering compute, TPUs, GPUs and AI services.",
      "web": "https://cloud.google.com"
    },
    "GE Vernova": {
      "desc": "Gas turbines, wind turbines, nuclear reactors and grid equipment for electricity producers.",
      "web": "https://www.gevernova.com"
    },
    "Gemini": {
      "desc": "Google's AI assistant across the web, Android and Workspace.",
      "web": "https://gemini.google.com"
    },
    "Gemini CLI": {
      "desc": "Open-source command-line agent that brings Gemini into your terminal.",
      "web": "https://github.com/google-gemini/gemini-cli"
    },
    "Gemini Code Assist": {
      "desc": "Google's coding assistant for completion and chat in IDEs.",
      "web": "https://codeassist.google"
    },
    "Gemini Enterprise": {
      "desc": "Google platform for company search, chat and agents over work data.",
      "web": "https://cloud.google.com/gemini-enterprise"
    },
    "Gemini Robotics": {
      "desc": "Google DeepMind's models that let robots see, reason, and act.",
      "web": "https://deepmind.google/models/gemini-robotics/"
    },
    "Generalist AI": {
      "desc": "Builds AI models that give robots general physical skills.",
      "web": "https://generalistai.com"
    },
    "Generate:Biomedicines": {
      "desc": "Biotech using generative models to design protein-based medicines.",
      "web": "https://generatebiomedicines.com"
    },
    "Genesis AI": {
      "desc": "Builds general-purpose robots and the AI models that run them.",
      "web": "https://genesis.ai"
    },
    "Genesis Cloud": {
      "desc": "European GPU cloud running on renewable energy.",
      "web": "https://www.genesiscloud.com"
    },
    "Genkit": {
      "desc": "Google's open-source framework for building AI features into apps.",
      "web": "https://genkit.dev"
    },
    "Genmo": {
      "desc": "Open-source video generation models, including Mochi.",
      "web": "https://www.genmo.ai"
    },
    "Genspark": {
      "desc": "Workspace whose agents research, make slides and sheets, and do tasks.",
      "web": "https://www.genspark.ai"
    },
    "GetReal Security": {
      "desc": "Tools that detect deepfakes and manipulated media in real time.",
      "web": "https://www.getrealsecurity.com"
    },
    "Getty Images": {
      "desc": "Stock photo and video agency that licenses images, including for AI.",
      "web": "https://www.gettyimages.com"
    },
    "Gigabyte": {
      "desc": "Motherboards, graphics cards and GPU servers for AI data centers.",
      "web": "https://www.gigabyte.com"
    },
    "Gladia": {
      "desc": "Speech-to-text API for transcribing calls and meetings in real time.",
      "web": "https://www.gladia.io"
    },
    "Glass Health": {
      "desc": "Clinical decision support and note-writing tool for doctors.",
      "web": "https://glass.health"
    },
    "Glean": {
      "desc": "Search and assistant across a company's apps and documents.",
      "web": "https://www.glean.com"
    },
    "Gling": {
      "desc": "Tool that cuts silences and bad takes from YouTube recordings.",
      "web": "https://www.gling.ai"
    },
    "GlobalFoundries": {
      "desc": "Contract chipmaker focused on mature and specialty process nodes.",
      "web": "https://gf.com"
    },
    "Google ADK": {
      "desc": "Google's open-source Agent Development Kit for building and deploying agents.",
      "web": "https://google.github.io/adk-docs/"
    },
    "Google DeepMind": {
      "desc": "Google's AI research lab that builds the Gemini models.",
      "web": "https://deepmind.google"
    },
    "Google Genie": {
      "desc": "Google DeepMind's model that generates interactive, playable worlds.",
      "web": "https://deepmind.google/models/genie/"
    },
    "Google Tensor": {
      "desc": "Google's in-house chips for Pixel phones that run AI features on device.",
      "web": "https://store.google.com"
    },
    "Google TPU": {
      "desc": "Google's TPUs (Tensor Processing Units), custom chips for training and running AI models.",
      "web": "https://cloud.google.com/tpu"
    },
    "Google Translate": {
      "desc": "Google's free translation app for text, speech, images and conversations.",
      "web": "https://translate.google.com"
    },
    "Google Veo": {
      "desc": "Google's video generation model that also produces sound.",
      "web": "https://deepmind.google/models/veo/"
    },
    "Gorgias AI": {
      "desc": "Gorgias's AI agent that answers support tickets for online stores.",
      "web": "https://www.gorgias.com/ai-agent"
    },
    "GPT Image": {
      "desc": "OpenAI's image generation model used in ChatGPT and its API.",
      "web": "https://openai.com"
    },
    "GPT4All": {
      "desc": "Nomic AI's desktop app for running language models privately offline.",
      "web": "https://www.nomic.ai/gpt4all"
    },
    "Grammarly": {
      "desc": "Writing assistant that fixes grammar and tone as you type.",
      "web": "https://www.grammarly.com"
    },
    "Granola": {
      "desc": "Meeting notepad that merges your notes with the call transcript.",
      "web": "https://www.granola.ai"
    },
    "Graphcore": {
      "desc": "UK designer of IPU processors for AI, now owned by SoftBank.",
      "web": "https://www.graphcore.ai"
    },
    "Graphite": {
      "desc": "Code review platform with stacked pull requests and automated reviews.",
      "web": "https://graphite.com"
    },
    "Graphlit": {
      "desc": "API platform that ingests content and provides retrieval for AI agents.",
      "web": "https://www.graphlit.com"
    },
    "GraphRAG": {
      "desc": "Microsoft's open-source method for retrieval using knowledge graphs.",
      "web": "https://microsoft.github.io/graphrag/"
    },
    "Gray Swan AI": {
      "desc": "AI security company running red-teaming arenas and building safety tools.",
      "web": "https://www.grayswan.ai"
    },
    "GRC": {
      "desc": "Single-phase immersion cooling systems that submerge servers in liquid.",
      "web": "https://www.grcooling.com"
    },
    "Greptile": {
      "desc": "Code review bot that understands the whole codebase.",
      "web": "https://www.greptile.com"
    },
    "Gretel": {
      "desc": "Synthetic data generation APIs, now part of Nvidia.",
      "web": "https://gretel.ai"
    },
    "Grok": {
      "desc": "xAI's chatbot built into X with real-time web access.",
      "web": "https://grok.com"
    },
    "Grok companions": {
      "desc": "Animated companion characters inside the Grok app.",
      "web": "https://grok.com"
    },
    "Grok DeepSearch": {
      "desc": "Grok feature that searches the web and X to write detailed answers.",
      "web": "https://grok.com"
    },
    "Groq": {
      "desc": "LPU chips and a cloud service for low-latency inference.",
      "web": "https://groq.com"
    },
    "Groq Cloud": {
      "desc": "Groq's cloud API for fast model inference on its LPU chips.",
      "web": "https://groq.com"
    },
    "Guardrails AI": {
      "desc": "Open-source framework for validating and correcting LLM outputs.",
      "web": "https://www.guardrailsai.com"
    },
    "Gumloop": {
      "desc": "No-code tool for building AI automations by connecting steps visually.",
      "web": "https://www.gumloop.com"
    },
    "Guru": {
      "desc": "Company knowledge base that answers employee questions from verified content.",
      "web": "https://www.getguru.com"
    },
    "Hadrian": {
      "desc": "Automated factories that make precision parts for aerospace and defense.",
      "web": "https://www.hadrian.co"
    },
    "Hailo": {
      "desc": "Low-power AI processors for cameras, vehicles and other edge devices.",
      "web": "https://hailo.ai"
    },
    "Hailuo": {
      "desc": "MiniMax's app and model that turn text or images into video.",
      "web": "https://hailuoai.video"
    },
    "Haize Labs": {
      "desc": "Automated red-teaming and testing to make AI systems more reliable.",
      "web": "https://www.haizelabs.com"
    },
    "Halluminate": {
      "desc": "RL environments that train models on finance and professional workflows.",
      "web": "https://halluminate.ai"
    },
    "Hammerspace": {
      "desc": "Software that unifies files across storage systems and sites into one namespace.",
      "web": "https://hammerspace.com"
    },
    "Hamming AI": {
      "desc": "Automated testing and monitoring for AI voice and chat agents.",
      "web": "https://hamming.ai"
    },
    "Handshake AI": {
      "desc": "Handshake's program paying students and experts to create AI training data.",
      "web": "https://joinhandshake.com"
    },
    "Harmonic": {
      "desc": "Builds AI models for formally verified mathematical reasoning.",
      "web": "https://harmonic.fun"
    },
    "Harvey": {
      "desc": "Assistant for lawyers that drafts, reviews and researches legal work.",
      "web": "https://www.harvey.ai"
    },
    "Hatchet": {
      "desc": "Open-source platform for background tasks and durable workflows.",
      "web": "https://hatchet.run"
    },
    "Haystack": {
      "desc": "deepset's open-source Python framework for search and LLM apps.",
      "web": "https://haystack.deepset.ai"
    },
    "Hebbia": {
      "desc": "Searches and analyzes large document sets for finance and legal firms.",
      "web": "https://www.hebbia.com"
    },
    "Hedra": {
      "desc": "Generates talking-character videos from images, audio and text.",
      "web": "https://www.hedra.com"
    },
    "Heidi Health": {
      "desc": "Medical scribe that writes notes, letters and documents for clinicians.",
      "web": "https://www.heidihealth.com"
    },
    "Helicone": {
      "desc": "Open-source gateway and logging tool for monitoring LLM usage.",
      "web": "https://www.helicone.ai"
    },
    "Helion Energy": {
      "desc": "Developer of fusion power plants, with a deal to supply Microsoft.",
      "web": "https://www.helionenergy.com"
    },
    "Helsing": {
      "desc": "European defense company building software and autonomous drones for militaries.",
      "web": "https://helsing.ai"
    },
    "Hex Magic": {
      "desc": "Hex's assistant that writes SQL and Python and answers data questions.",
      "web": "https://hex.tech"
    },
    "HeyGen": {
      "desc": "Avatar videos and translated videos generated from text or footage.",
      "web": "https://www.heygen.com"
    },
    "HeyGen Translate": {
      "desc": "HeyGen's video translation with the speaker's voice and lip sync.",
      "web": "https://www.heygen.com/translate"
    },
    "Hidden Door": {
      "desc": "Story game platform where players adventure in generated tabletop-style worlds.",
      "web": "https://www.hiddendoor.co"
    },
    "HiddenLayer": {
      "desc": "Security platform that protects AI models from attacks and tampering.",
      "web": "https://hiddenlayer.com"
    },
    "Higgsfield": {
      "desc": "Video and image generation studio with camera-motion presets for creators.",
      "web": "https://higgsfield.ai"
    },
    "Hippocratic AI": {
      "desc": "Voice agents that make patient calls for nursing and care tasks.",
      "web": "https://www.hippocraticai.com"
    },
    "HireVue": {
      "desc": "Video interviews and assessments that help screen job candidates.",
      "web": "https://www.hirevue.com"
    },
    "Hitachi Energy": {
      "desc": "Transformers, high-voltage grid equipment and power quality systems for utilities and industry.",
      "web": "https://www.hitachienergy.com"
    },
    "Hive": {
      "desc": "Models and APIs that detect harmful, fake or generated images, video and text.",
      "web": "https://thehive.ai"
    },
    "Holistic AI": {
      "desc": "Platform for governing AI models, tracking risk and meeting regulations.",
      "web": "https://www.holisticai.com"
    },
    "HoneyHive": {
      "desc": "Platform for evaluating, tracing and monitoring AI agents.",
      "web": "https://www.honeyhive.ai"
    },
    "HPE": {
      "desc": "Servers, storage, networking and supercomputers, including AI systems.",
      "web": "https://www.hpe.com"
    },
    "Huawei Ascend": {
      "desc": "Huawei's AI chips and software stack for training and inference.",
      "web": "https://www.hiascend.com"
    },
    "Hugging Face Hub": {
      "desc": "Hugging Face's shared hub for hosting models, datasets, and demos.",
      "web": "https://huggingface.co/models"
    },
    "HUMAIN": {
      "desc": "Saudi Arabian state-backed company building AI data centers, clouds, and models.",
      "web": "https://www.humain.com"
    },
    "Human Native AI": {
      "desc": "Marketplace connecting rights holders with AI companies to license data.",
      "web": "https://www.humannative.ai"
    },
    "Hume AI": {
      "desc": "Voice models that detect and express emotion in speech.",
      "web": "https://www.hume.ai"
    },
    "Hunyuan3D": {
      "desc": "Tencent's open model that generates 3D assets from text or images.",
      "web": "https://3d.hunyuan.tencent.com"
    },
    "HunyuanVideo": {
      "desc": "Tencent's open-source model that generates video from text or images.",
      "web": "https://hunyuan.tencent.com"
    },
    "Hyperbolic": {
      "desc": "GPU rental marketplace and low-cost inference for open models.",
      "web": "https://hyperbolic.ai"
    },
    "Hyperbound": {
      "desc": "Role-play simulator where sales reps practice calls with simulated buyers.",
      "web": "https://www.hyperbound.ai"
    },
    "Hyperbrowser": {
      "desc": "Cloud headless browsers at scale for AI agents and scraping.",
      "web": "https://www.hyperbrowser.ai"
    },
    "Hyperscience": {
      "desc": "Document processing software that turns forms and files into data.",
      "web": "https://www.hyperscience.ai"
    },
    "HyperWrite": {
      "desc": "Writing assistant that drafts, completes and researches text.",
      "web": "https://www.hyperwriteai.com"
    },
    "Hypotenuse AI": {
      "desc": "Product descriptions and catalog content generation for e-commerce teams.",
      "web": "https://www.hypotenuse.ai"
    },
    "IBM Cloud": {
      "desc": "IBM's cloud platform for enterprise and hybrid cloud workloads.",
      "web": "https://www.ibm.com/cloud"
    },
    "IBM Granite": {
      "desc": "IBM's open, compact language models built for enterprise use.",
      "web": "https://www.ibm.com/granite"
    },
    "Ideogram": {
      "desc": "Image generator known for rendering readable text inside images.",
      "web": "https://ideogram.ai"
    },
    "Imagen / Nano Banana": {
      "desc": "Google's image generation and editing models in Gemini.",
      "web": "https://deepmind.google/models/imagen/"
    },
    "IMATAG": {
      "desc": "Invisible watermarking to protect and track images and video.",
      "web": "https://www.imatag.com"
    },
    "iMerit": {
      "desc": "Expert data annotation and evaluation for AI in medicine, vehicles, and more.",
      "web": "https://imerit.net"
    },
    "Inceptive": {
      "desc": "Models that design RNA molecules for new medicines.",
      "web": "https://inceptive.com"
    },
    "Inference Providers": {
      "desc": "Hugging Face's single API for models hosted by many inference providers.",
      "web": "https://huggingface.co/docs/inference-providers"
    },
    "Inference.net": {
      "desc": "Low-cost API for running and custom-training open models.",
      "web": "https://inference.net"
    },
    "Infinitus Systems": {
      "desc": "Voice agents that call insurers to check patient benefits and authorizations.",
      "web": "https://www.infinitus.ai"
    },
    "Inngest": {
      "desc": "Durable functions and event-driven workflows that run inside your code.",
      "web": "https://www.inngest.com"
    },
    "Inspur": {
      "desc": "Chinese server maker, now IEIT Systems, selling AI and cloud servers.",
      "web": "https://en.ieisystem.com"
    },
    "Instabase": {
      "desc": "Platform for automating document-heavy business processes.",
      "web": "https://www.instabase.com"
    },
    "Instructor": {
      "desc": "Python library for getting structured, validated outputs from LLMs.",
      "web": "https://python.useinstructor.com"
    },
    "Instrumental": {
      "desc": "Camera-based inspection that finds defects on electronics assembly lines.",
      "web": "https://instrumental.com"
    },
    "Intel": {
      "desc": "PC and server processors, including CPUs with built-in NPUs for on-device AI.",
      "web": "https://www.intel.com"
    },
    "Intel Foundry": {
      "desc": "Intel's contract chip manufacturing and packaging business for outside customers.",
      "web": "https://www.intel.com/content/www/us/en/foundry/overview.html"
    },
    "Intel Gaudi": {
      "desc": "Intel's AI accelerator chips for training and running deep learning models.",
      "web": "https://www.intel.com"
    },
    "Intercom Fin": {
      "desc": "Intercom's AI agent that answers customer support questions.",
      "web": "https://fin.ai"
    },
    "invideo AI": {
      "desc": "Generates complete videos from text prompts.",
      "web": "https://invideo.io"
    },
    "Invisible Technologies": {
      "desc": "Expert human data and AI training services for labs and enterprises.",
      "web": "https://invisibletech.ai"
    },
    "Inworld": {
      "desc": "Voice and character models for interactive game and app characters.",
      "web": "https://inworld.ai"
    },
    "io.net": {
      "desc": "Decentralized network that pools GPUs for on-demand AI compute.",
      "web": "https://io.net"
    },
    "IREN": {
      "desc": "Former bitcoin miner that runs its own data centers and rents GPU cloud capacity.",
      "web": "https://iren.com"
    },
    "Iron Mountain Data Centers": {
      "desc": "Data center arm of Iron Mountain offering colocation and build-to-suit facilities.",
      "web": "https://www.ironmountain.com/data-centers"
    },
    "Ironclad AI": {
      "desc": "Contract review and analysis features inside Ironclad's contract management software.",
      "web": "https://ironcladapp.com"
    },
    "Irregular": {
      "desc": "Security lab that tests frontier AI models for dangerous capabilities.",
      "web": "https://www.irregular.com"
    },
    "Isomorphic Labs": {
      "desc": "Alphabet's drug discovery company building on AlphaFold.",
      "web": "https://www.isomorphiclabs.com"
    },
    "Jan": {
      "desc": "Open-source desktop app for chatting with local and cloud models.",
      "web": "https://www.jan.ai"
    },
    "Jasper": {
      "desc": "Content generation platform for marketing teams.",
      "web": "https://www.jasper.ai"
    },
    "JAX": {
      "desc": "Google's Python library for fast numerical computing and model training.",
      "web": "https://docs.jax.dev"
    },
    "JetBrains AI Assistant": {
      "desc": "Code completion and chat built into JetBrains IDEs.",
      "web": "https://www.jetbrains.com/ai-assistant"
    },
    "JetCool": {
      "desc": "Microjet direct-to-chip liquid cooling for processors, now part of Flex.",
      "web": "https://jetcool.com"
    },
    "Jina AI": {
      "desc": "Embedding, reranking, and web-reading models for search, now part of Elastic.",
      "web": "https://jina.ai"
    },
    "Jina Reader": {
      "desc": "Jina's API that turns web pages into clean text for LLMs.",
      "web": "https://jina.ai/reader"
    },
    "Johnson Controls": {
      "desc": "Building cooling, chillers, fire and security systems, including for data centers.",
      "web": "https://www.johnsoncontrols.com"
    },
    "Jua": {
      "desc": "Builds AI foundation models for weather and energy-market forecasting.",
      "web": "https://www.jua.ai"
    },
    "Juicebox": {
      "desc": "Recruiting tool that searches profiles to find and contact candidates.",
      "web": "https://juicebox.ai"
    },
    "Jules": {
      "desc": "Google coding agent that works on GitHub repositories asynchronously.",
      "web": "https://jules.google"
    },
    "Julius AI": {
      "desc": "Analyzes spreadsheets and data files and makes charts from chat.",
      "web": "https://julius.ai"
    },
    "Junie": {
      "desc": "JetBrains coding agent that works inside its IDEs.",
      "web": "https://www.jetbrains.com/junie/"
    },
    "Juniper Networks": {
      "desc": "Routers, switches and network management software, now part of HPE.",
      "web": "https://www.juniper.net"
    },
    "Jupiter Intelligence": {
      "desc": "Climate risk data showing how floods, heat and storms affect assets.",
      "web": "https://www.jupiterintel.com"
    },
    "Kaedim": {
      "desc": "Turns concept art into production-ready 3D models for games.",
      "web": "https://www.kaedim3d.com"
    },
    "Kagi Assistant": {
      "desc": "Chat assistant inside the paid Kagi search engine using several models.",
      "web": "https://kagi.com/assistant"
    },
    "Kairos Power": {
      "desc": "Developer of molten-salt-cooled small nuclear reactors, with a power deal with Google.",
      "web": "https://kairospower.com"
    },
    "Keras": {
      "desc": "High-level Python library for building neural networks on several backends.",
      "web": "https://keras.io"
    },
    "Kernel": {
      "desc": "Fast cloud browsers for AI agents to use the web.",
      "web": "https://www.kernel.sh"
    },
    "Keycard": {
      "desc": "Identity and access control for AI agents and software.",
      "web": "https://keycard.ai"
    },
    "Kilo Code": {
      "desc": "Open-source coding agent extension for VS Code and JetBrains editors.",
      "web": "https://kilo.ai"
    },
    "Kimi": {
      "desc": "Moonshot AI's chat assistant known for long documents and agentic tasks.",
      "web": "https://www.kimi.com"
    },
    "Kinaxis": {
      "desc": "Supply chain planning software that models changes in real time.",
      "web": "https://www.kinaxis.com"
    },
    "Kindroid": {
      "desc": "App for creating and chatting with personalized companion characters.",
      "web": "https://kindroid.ai"
    },
    "Kioxia": {
      "desc": "Japanese maker of NAND flash memory and SSDs.",
      "web": "https://www.kioxia.com"
    },
    "Kira": {
      "desc": "Litera's tool that extracts and reviews clauses across many contracts.",
      "web": "https://www.litera.com/products/kira"
    },
    "Kiro": {
      "desc": "AWS code editor that turns specs into plans and code with agents.",
      "web": "https://kiro.dev"
    },
    "Kittl": {
      "desc": "Online graphic design tool for logos, merchandise and print.",
      "web": "https://www.kittl.com"
    },
    "KLA": {
      "desc": "Inspection and measurement equipment that finds defects during chip manufacturing.",
      "web": "https://www.kla.com"
    },
    "Klarity": {
      "desc": "Document review automation for finance and accounting teams.",
      "web": "https://www.klarity.ai"
    },
    "Kling": {
      "desc": "Kuaishou's text-to-video and image-to-video generation model.",
      "web": "https://klingai.com"
    },
    "Kneron": {
      "desc": "Edge AI chips and software for devices such as cameras and cars.",
      "web": "https://www.kneron.com"
    },
    "Kodiak Robotics": {
      "desc": "Self-driving technology for freight trucks and military vehicles.",
      "web": "https://kodiak.ai"
    },
    "Kong AI Gateway": {
      "desc": "Kong's gateway for securing and managing traffic to LLM APIs.",
      "web": "https://konghq.com/products/kong-ai-gateway"
    },
    "Kore.ai": {
      "desc": "Platform for building conversational AI agents for customer and employee service.",
      "web": "https://kore.ai"
    },
    "Koyeb": {
      "desc": "Serverless platform for deploying apps and AI models on GPUs worldwide.",
      "web": "https://www.koyeb.com"
    },
    "Krea": {
      "desc": "Creative app for generating and editing images and video in real time.",
      "web": "https://www.krea.ai"
    },
    "Krisp": {
      "desc": "Noise cancellation, accent conversion and meeting notes for calls.",
      "web": "https://krisp.ai"
    },
    "Krutrim": {
      "desc": "Ola's Indian AI company building language models and an AI cloud.",
      "web": "https://www.olakrutrim.com"
    },
    "Krutrim Cloud": {
      "desc": "Ola Krutrim's Indian cloud offering GPUs and hosted AI models.",
      "web": "https://www.olakrutrim.com"
    },
    "KServe": {
      "desc": "Open-source system for serving models on Kubernetes.",
      "web": "https://kserve.github.io/website/"
    },
    "KUDO": {
      "desc": "Live speech translation for meetings and conferences.",
      "web": "https://kudo.ai"
    },
    "Kumo AI": {
      "desc": "Predictions directly from relational business data without manual feature work.",
      "web": "https://kumo.ai"
    },
    "Kyutai": {
      "desc": "French nonprofit lab releasing open speech and language models like Moshi.",
      "web": "https://kyutai.org"
    },
    "Labelbox": {
      "desc": "Labeling software and expert data services for training AI models.",
      "web": "https://labelbox.com"
    },
    "Lakera": {
      "desc": "Runtime protection against prompt injection and other LLM attacks.",
      "web": "https://www.lakera.ai"
    },
    "Lam Research": {
      "desc": "Etch and deposition equipment used in chip manufacturing.",
      "web": "https://www.lamresearch.com"
    },
    "Lambda": {
      "desc": "GPU cloud and on-demand clusters for training and running AI models.",
      "web": "https://lambda.ai"
    },
    "Laminar": {
      "desc": "Open-source tracing and evaluation for AI agents.",
      "web": "https://www.lmnr.ai"
    },
    "LanceDB": {
      "desc": "Open-source database and storage format for multimodal AI data.",
      "web": "https://lancedb.com"
    },
    "Lancium": {
      "desc": "Developer of large, flexible-load data center campuses powered by Texas energy.",
      "web": "https://lancium.com"
    },
    "Landing AI": {
      "desc": "Visual inspection and document extraction tools built on computer vision.",
      "web": "https://landing.ai"
    },
    "LangChain": {
      "desc": "Open-source framework and tools for building LLM apps and agents.",
      "web": "https://www.langchain.com"
    },
    "Langflow": {
      "desc": "Open-source visual builder for AI agents and RAG apps.",
      "web": "https://www.langflow.org"
    },
    "Langfuse": {
      "desc": "Open-source platform for tracing, evaluating and managing prompts in LLM apps.",
      "web": "https://langfuse.com"
    },
    "LangGraph": {
      "desc": "Framework for building stateful, multi-step agents as graphs.",
      "web": "https://www.langchain.com/langgraph"
    },
    "LangMem": {
      "desc": "LangChain's library for giving agents long-term memory.",
      "web": "https://langchain-ai.github.io/langmem/"
    },
    "LangSmith": {
      "desc": "LangChain's platform for tracing, testing and evaluating LLM apps.",
      "web": "https://www.langchain.com/langsmith"
    },
    "LanguageTool": {
      "desc": "Grammar and style checker that works in many languages.",
      "web": "https://languagetool.org"
    },
    "Lark Health": {
      "desc": "Chat coaching for chronic conditions such as diabetes and hypertension.",
      "web": "https://www.lark.com"
    },
    "Latent Labs": {
      "desc": "Generative models for designing proteins and other biological molecules.",
      "web": "https://www.latentlabs.com"
    },
    "Layer AI": {
      "desc": "Generates and manages art assets for games and marketing.",
      "web": "https://www.layer.ai"
    },
    "Le Chat": {
      "desc": "Mistral AI's chat assistant with web search and document tools.",
      "web": "https://chat.mistral.ai"
    },
    "LegalOn": {
      "desc": "Contract review software for in-house legal teams.",
      "web": "https://www.legalontech.com"
    },
    "Legora": {
      "desc": "Assistant for lawyers that reviews contracts and researches legal questions.",
      "web": "https://legora.com"
    },
    "Lenovo": {
      "desc": "PCs, phones and data center servers, including GPU systems for AI.",
      "web": "https://www.lenovo.com"
    },
    "Lensa": {
      "desc": "Prisma Labs' photo editing app known for generated avatars.",
      "web": "https://lensa-ai.com"
    },
    "Leonardo.Ai": {
      "desc": "Canva-owned image and video generator for creative work.",
      "web": "https://leonardo.ai"
    },
    "Letta": {
      "desc": "Platform for building stateful agents with long-term memory, formerly MemGPT.",
      "web": "https://www.letta.com"
    },
    "Lexis+ AI": {
      "desc": "LexisNexis assistant for legal research and drafting using its case law.",
      "web": "https://www.lexisnexis.com/en-us/products/lexis-plus-ai.page"
    },
    "LG AI Research (EXAONE)": {
      "desc": "LG's family of Korean and English language and reasoning models.",
      "web": "https://www.lgresearch.ai"
    },
    "Lightmatter": {
      "desc": "Photonic interconnect chips that move data between AI processors using light.",
      "web": "https://lightmatter.co"
    },
    "Lila Sciences": {
      "desc": "Builds AI models and autonomous labs that run scientific experiments.",
      "web": "https://www.lila.ai"
    },
    "Lilac": {
      "desc": "Open-source tool for exploring and cleaning text datasets, now at Databricks.",
      "web": "https://www.databricks.com"
    },
    "Lilt": {
      "desc": "Translation platform combining machine translation with human translators.",
      "web": "https://lilt.com"
    },
    "Limitless": {
      "desc": "Wearable pendant that records and summarizes your conversations and meetings.",
      "web": "https://www.limitless.ai"
    },
    "Lindy": {
      "desc": "AI assistant and agent builder for email, meetings and business tasks.",
      "web": "https://www.lindy.ai"
    },
    "Linkup": {
      "desc": "Web search API that connects AI models to the internet.",
      "web": "https://www.linkup.so"
    },
    "Liquid AI": {
      "desc": "Builds small, efficient foundation models that run on devices.",
      "web": "https://www.liquid.ai"
    },
    "LiquidStack": {
      "desc": "Immersion and direct-to-chip liquid cooling systems for data centers.",
      "web": "https://liquidstack.com"
    },
    "LiteLLM": {
      "desc": "Open-source proxy that calls many LLM providers through one API.",
      "web": "https://www.litellm.ai"
    },
    "LiteRT": {
      "desc": "Google's runtime for running models on phones and edge devices.",
      "web": "https://ai.google.dev/edge/litert"
    },
    "Live Translation": {
      "desc": "Apple's on-device translation of calls, messages and conversations.",
      "web": "https://www.apple.com"
    },
    "LiveKit Agents": {
      "desc": "LiveKit's open-source framework for real-time voice and video AI agents.",
      "web": "https://docs.livekit.io/agents/"
    },
    "Llama Guard": {
      "desc": "Meta's open models that flag unsafe prompts and responses.",
      "web": "https://www.llama.com/docs/model-cards-and-prompt-formats/llama-guard-4/"
    },
    "llama.cpp": {
      "desc": "Open-source C/C++ engine for running LLMs on local hardware.",
      "web": "https://github.com/ggml-org/llama.cpp"
    },
    "llamafile": {
      "desc": "Packs a language model into one file that runs anywhere.",
      "web": "https://github.com/mozilla-ai/llamafile"
    },
    "LlamaIndex": {
      "desc": "Framework and cloud tools for building agents over documents.",
      "web": "https://www.llamaindex.ai"
    },
    "LlamaParse": {
      "desc": "LlamaIndex's service for parsing complex documents for LLM apps.",
      "web": "https://www.llamaindex.ai/llamaparse"
    },
    "LLM Observability": {
      "desc": "Datadog's feature for tracing and monitoring LLM applications in production.",
      "web": "https://www.datadoghq.com/product/llm-observability/"
    },
    "llm-d": {
      "desc": "Open-source system for distributed LLM serving on Kubernetes.",
      "web": "https://llm-d.ai"
    },
    "LM Studio": {
      "desc": "Desktop app for downloading and running open models locally.",
      "web": "https://lmstudio.ai"
    },
    "LMArena": {
      "desc": "Public leaderboard ranking AI models through crowd-sourced head-to-head votes.",
      "web": "https://lmarena.ai"
    },
    "LMDeploy": {
      "desc": "Open-source toolkit for compressing and serving LLMs.",
      "web": "https://github.com/InternLM/lmdeploy"
    },
    "LMNT": {
      "desc": "Low-latency text-to-speech and voice cloning API.",
      "web": "https://www.lmnt.com"
    },
    "Looka": {
      "desc": "Generates logos and brand kits for small businesses.",
      "web": "https://looka.com"
    },
    "Loora": {
      "desc": "App for practicing spoken English through conversations with a tutor.",
      "web": "https://loora.ai"
    },
    "Lorikeet": {
      "desc": "AI support agents for complex and regulated businesses.",
      "web": "https://www.lorikeetcx.ai"
    },
    "Loudly": {
      "desc": "Royalty-free music generator and library for digital projects.",
      "web": "https://www.loudly.com"
    },
    "Lovable": {
      "desc": "Builds web apps and websites from chat prompts.",
      "web": "https://lovable.dev"
    },
    "Lovart": {
      "desc": "Design agent that creates brand visuals, posters and videos.",
      "web": "https://www.lovart.ai"
    },
    "LTX": {
      "desc": "Lightricks' open video generation model and storyboarding studio.",
      "web": "https://ltx.studio"
    },
    "LTX Studio": {
      "desc": "Lightricks' tool for planning and generating videos from scripts.",
      "web": "https://ltx.studio"
    },
    "Luma": {
      "desc": "Makes the Ray video generation models and Dream Machine app.",
      "web": "https://lumalabs.ai"
    },
    "Lumentum": {
      "desc": "Optical and photonic components, including lasers and transceivers for data centers.",
      "web": "https://www.lumentum.com"
    },
    "Luminance": {
      "desc": "Contract review and negotiation software for legal teams.",
      "web": "https://www.luminance.com"
    },
    "Lunit": {
      "desc": "Software that reads X-rays, mammograms and tissue slides to find cancer.",
      "web": "https://www.lunit.io"
    },
    "Lyria": {
      "desc": "Google DeepMind's model that generates music from text prompts.",
      "web": "https://deepmind.google/models/lyria/"
    },
    "Machina Labs": {
      "desc": "Robotic factories that form sheet metal parts without fixed tooling.",
      "web": "https://machinalabs.ai"
    },
    "MacWhisper": {
      "desc": "Mac app that transcribes audio and video files on device.",
      "web": "https://goodsnooze.gumroad.com/l/macwhisper"
    },
    "Magic": {
      "desc": "Builds code models with very long context to automate software engineering.",
      "web": "https://magic.dev"
    },
    "Magnific": {
      "desc": "Image upscaler that adds detail while enlarging pictures.",
      "web": "https://magnific.ai"
    },
    "Make": {
      "desc": "Visual automation platform for connecting apps and building AI agents.",
      "web": "https://www.make.com"
    },
    "Manus": {
      "desc": "General agent that plans and carries out multi-step tasks on its own computer.",
      "web": "https://manus.im"
    },
    "Marqo": {
      "desc": "Search platform for online stores, built on vector search.",
      "web": "https://www.marqo.ai"
    },
    "Martian": {
      "desc": "Routes each prompt to the best-suited model to cut costs.",
      "web": "https://withmartian.com"
    },
    "Marvell": {
      "desc": "Data infrastructure chips, including optical interconnect and custom AI silicon.",
      "web": "https://www.marvell.com"
    },
    "Marvell custom silicon": {
      "desc": "Custom chip design services that build AI accelerators for cloud providers.",
      "web": "https://www.marvell.com"
    },
    "Mastercard Agent Pay": {
      "desc": "Mastercard's framework for letting AI agents make payments safely.",
      "web": "https://www.mastercard.com/us/en/business/artificial-intelligence/mastercard-agent-pay.html"
    },
    "Mastra": {
      "desc": "Open-source TypeScript framework for building AI agents.",
      "web": "https://mastra.ai"
    },
    "MatX": {
      "desc": "Chips designed specifically for training and running large language models.",
      "web": "https://matx.com"
    },
    "Maven AGI": {
      "desc": "AI agents that answer customer questions across support channels.",
      "web": "https://www.mavenagi.com"
    },
    "MAX": {
      "desc": "Modular's inference engine for serving models on many chip types.",
      "web": "https://www.modular.com/max"
    },
    "MaxText": {
      "desc": "Google's open-source code for training large language models on TPUs and GPUs.",
      "web": "https://github.com/AI-Hypercomputer/maxtext"
    },
    "MCP": {
      "desc": "Model Context Protocol, an open standard for connecting AI models to tools and data.",
      "web": "https://modelcontextprotocol.io"
    },
    "Mechanize": {
      "desc": "Builds reinforcement learning environments and sells them to AI labs.",
      "web": "https://www.mechanize.work"
    },
    "MediaTek": {
      "desc": "Smartphone and device chips with built-in AI processors.",
      "web": "https://www.mediatek.com"
    },
    "Megatron": {
      "desc": "Nvidia's library for training large transformer models across many GPUs.",
      "web": "https://developer.nvidia.com/megatron-core"
    },
    "Mem": {
      "desc": "Note-taking app that organizes and recalls your notes automatically.",
      "web": "https://mem.ai"
    },
    "Mem0": {
      "desc": "Memory layer that lets AI agents remember users across conversations.",
      "web": "https://mem0.ai"
    },
    "Memgraph": {
      "desc": "In-memory graph database for real-time queries.",
      "web": "https://memgraph.com"
    },
    "Mercor": {
      "desc": "Recruits domain experts and pays them to create AI training data.",
      "web": "https://www.mercor.com"
    },
    "Merge": {
      "desc": "Single API for connecting products to many business software tools.",
      "web": "https://www.merge.dev"
    },
    "Meshy": {
      "desc": "Generates 3D models and textures from text or images.",
      "web": "https://www.meshy.ai"
    },
    "Meta": {
      "desc": "Social media company that builds the open-weight Llama models.",
      "web": "https://ai.meta.com"
    },
    "Meta AI": {
      "desc": "Meta's assistant inside WhatsApp, Instagram, Facebook and Ray-Ban glasses.",
      "web": "https://www.meta.ai"
    },
    "Meta MTIA": {
      "desc": "Meta's in-house chips for running its recommendation and AI models.",
      "web": "https://ai.meta.com"
    },
    "MetaX": {
      "desc": "Chinese designer of general-purpose GPUs for AI and high-performance computing.",
      "web": "https://www.metax-tech.com"
    },
    "METR": {
      "desc": "Nonprofit that measures what AI models can do autonomously and their risks.",
      "web": "https://metr.org"
    },
    "micro1": {
      "desc": "Expert human data and RL environments for training AI models.",
      "web": "https://www.micro1.ai"
    },
    "Micron": {
      "desc": "Memory and storage chipmaker producing DRAM, HBM and flash.",
      "web": "https://www.micron.com"
    },
    "Microsoft 365 Copilot": {
      "desc": "Microsoft's AI assistant inside Word, Excel, Outlook, Teams and other work apps.",
      "web": "https://www.microsoft.com/en-us/microsoft-365/copilot"
    },
    "Microsoft Agent Framework (AutoGen)": {
      "desc": "Microsoft's open-source framework for building single and multi-agent systems.",
      "web": "https://github.com/microsoft/agent-framework"
    },
    "Microsoft AI (MAI, Phi)": {
      "desc": "Microsoft's in-house models, including MAI and the small Phi models.",
      "web": "https://microsoft.ai"
    },
    "Microsoft Azure": {
      "desc": "Microsoft's cloud platform offering compute, GPUs and hosted AI models.",
      "web": "https://azure.microsoft.com"
    },
    "Microsoft Copilot": {
      "desc": "Microsoft's consumer AI assistant in Windows, Edge and Bing.",
      "web": "https://copilot.microsoft.com"
    },
    "Microsoft Designer": {
      "desc": "Microsoft's app for generating graphics, images and social posts.",
      "web": "https://designer.microsoft.com"
    },
    "Microsoft Maia": {
      "desc": "Microsoft's custom AI accelerator chip for running models in Azure.",
      "web": "https://azure.microsoft.com"
    },
    "Midjourney": {
      "desc": "Research lab and app that generates images and video from text.",
      "web": "https://www.midjourney.com"
    },
    "Midjourney app": {
      "desc": "Midjourney's web and Discord service for generating images from text.",
      "web": "https://www.midjourney.com"
    },
    "Milvus": {
      "desc": "Open-source vector database, with a managed version from Zilliz.",
      "web": "https://milvus.io"
    },
    "Mindgard": {
      "desc": "Automated red-teaming that finds security weaknesses in AI systems.",
      "web": "https://mindgard.ai"
    },
    "MindSpore": {
      "desc": "Huawei's open-source deep learning framework for its Ascend chips.",
      "web": "https://www.mindspore.cn/en"
    },
    "MindStudio": {
      "desc": "No-code platform for building and deploying custom AI agents.",
      "web": "https://www.mindstudio.ai"
    },
    "MiniMax": {
      "desc": "Chinese company making open-weight language, video, and voice models.",
      "web": "https://www.minimax.io"
    },
    "MinIO": {
      "desc": "S3-compatible object storage software for storing AI and analytics data.",
      "web": "https://www.min.io"
    },
    "Mistral": {
      "desc": "French company building open-weight and commercial language models.",
      "web": "https://mistral.ai"
    },
    "Mistral Code": {
      "desc": "Mistral's coding assistant for IDEs, aimed at enterprises.",
      "web": "https://mistral.ai/products/mistral-code"
    },
    "Mistral Compute": {
      "desc": "Mistral's European AI cloud offering GPU capacity and model hosting.",
      "web": "https://mistral.ai"
    },
    "Mistral OCR": {
      "desc": "Mistral's model that reads documents and extracts text and tables.",
      "web": "https://mistral.ai/news/mistral-ocr"
    },
    "Mixedbread": {
      "desc": "Embedding and reranking models plus search infrastructure for retrieval.",
      "web": "https://www.mixedbread.com"
    },
    "MLC LLM": {
      "desc": "Compiler that runs LLMs on phones, browsers, and local GPUs.",
      "web": "https://llm.mlc.ai"
    },
    "MLflow": {
      "desc": "Open-source platform for tracking experiments and managing models.",
      "web": "https://mlflow.org"
    },
    "Modal": {
      "desc": "Serverless platform for running Python code and AI models on cloud GPUs.",
      "web": "https://modal.com"
    },
    "Modal Sandboxes": {
      "desc": "Isolated containers on Modal for running untrusted or agent-written code.",
      "web": "https://modal.com/docs/guide/sandbox"
    },
    "ModelOp": {
      "desc": "Software for governing and tracking all AI models used in a company.",
      "web": "https://www.modelop.com"
    },
    "Modular": {
      "desc": "Mojo language and MAX platform for running AI across different hardware.",
      "web": "https://www.modular.com"
    },
    "Moments Lab": {
      "desc": "Indexes and searches video archives for media and content teams.",
      "web": "https://www.momentslab.com"
    },
    "Monitaur": {
      "desc": "Software for documenting, testing and governing AI models in regulated industries.",
      "web": "https://www.monitaur.ai"
    },
    "Moonshot Kimi": {
      "desc": "Moonshot AI's chatbot and open-weight Kimi language models.",
      "web": "https://www.kimi.com"
    },
    "Moonvalley": {
      "desc": "Video generation model trained on licensed footage for film studios.",
      "web": "https://moonvalley.com"
    },
    "Moore Threads": {
      "desc": "Chinese designer of general-purpose GPUs for graphics and AI computing.",
      "web": "https://www.mthreads.com"
    },
    "Morph": {
      "desc": "Fast-booting cloud machines and sandboxes for AI coding agents.",
      "web": "https://morph.so"
    },
    "MOSTLY AI": {
      "desc": "Generates privacy-safe synthetic versions of tabular datasets.",
      "web": "https://mostly.ai"
    },
    "Motivair": {
      "desc": "Liquid cooling and cooling distribution units for high-density servers, now part of Schneider.",
      "web": "https://www.motivaircorp.com"
    },
    "Moveworks": {
      "desc": "Assistant that answers employee requests and resolves IT and HR tickets.",
      "web": "https://www.moveworks.com"
    },
    "Mubert": {
      "desc": "Generates royalty-free music for streamers, apps, and video creators.",
      "web": "https://mubert.com"
    },
    "Multiverse Computing": {
      "desc": "Compresses large language models with quantum-inspired methods to cut costs.",
      "web": "https://multiversecomputing.com"
    },
    "Murf AI": {
      "desc": "Text-to-speech voiceovers for videos, training and presentations.",
      "web": "https://murf.ai"
    },
    "Mursion": {
      "desc": "Training simulations for practicing hard workplace conversations with avatars.",
      "web": "https://www.mursion.com"
    },
    "Musubi": {
      "desc": "Moderation tools that detect harmful content, spam and fraud on platforms.",
      "web": "https://www.musubilabs.ai"
    },
    "My AI": {
      "desc": "Snapchat's chatbot built into the app's chat.",
      "web": "https://www.snapchat.com"
    },
    "n8n": {
      "desc": "Workflow automation tool, open source, with built-in AI agent nodes.",
      "web": "https://n8n.io"
    },
    "Nabla": {
      "desc": "Ambient assistant that writes clinical notes during patient visits.",
      "web": "https://www.nabla.com"
    },
    "Nango": {
      "desc": "Open-source platform for building integrations with external APIs.",
      "web": "https://www.nango.dev"
    },
    "Nanonets": {
      "desc": "Document data extraction for invoices, receipts and forms.",
      "web": "https://nanonets.com"
    },
    "Nanotron": {
      "desc": "Hugging Face's minimal library for pretraining large models across GPUs.",
      "web": "https://github.com/huggingface/nanotron"
    },
    "Napkin AI": {
      "desc": "Turns text into diagrams, charts and visuals.",
      "web": "https://www.napkin.ai"
    },
    "Naver Cloud": {
      "desc": "Naver's cloud arm offering Korean sovereign cloud and AI services.",
      "web": "https://www.navercloudcorp.com"
    },
    "Naver HyperCLOVA X": {
      "desc": "Naver's Korean-focused large language model family.",
      "web": "https://clova.ai/en/hyperclova"
    },
    "Nebius": {
      "desc": "GPU cloud and AI infrastructure provider based in Amsterdam.",
      "web": "https://nebius.com"
    },
    "Nebius AI Studio": {
      "desc": "Nebius' API for running open models on its GPU cloud.",
      "web": "https://nebius.com/ai-studio"
    },
    "Nekuda": {
      "desc": "Wallet and checkout tools that let AI agents pay on websites.",
      "web": "https://nekuda.ai"
    },
    "NeMo": {
      "desc": "Nvidia's framework for building, training, and customizing generative models.",
      "web": "https://www.nvidia.com/en-us/ai-data-science/products/nemo/"
    },
    "NeMo Guardrails": {
      "desc": "Nvidia's open-source toolkit for adding safety rules to LLM apps.",
      "web": "https://developer.nvidia.com/nemo-guardrails"
    },
    "Neo4j": {
      "desc": "Graph database for storing and querying connected data.",
      "web": "https://neo4j.com"
    },
    "Neptune.ai": {
      "desc": "Experiment tracker for monitoring large model training runs.",
      "web": "https://neptune.ai"
    },
    "NetApp": {
      "desc": "Enterprise storage systems and data management software across on-premises and cloud.",
      "web": "https://www.netapp.com"
    },
    "Netomi": {
      "desc": "AI agents that resolve customer service tickets across channels.",
      "web": "https://www.netomi.com"
    },
    "Neural Compressor": {
      "desc": "Intel's open-source library for quantizing and shrinking models.",
      "web": "https://github.com/intel/neural-compressor"
    },
    "Neural Magic": {
      "desc": "Model compression and vLLM-based inference tools, now part of Red Hat.",
      "web": "https://www.redhat.com"
    },
    "News Corp": {
      "desc": "News and publishing group that licenses its journalism to AI companies.",
      "web": "https://newscorp.com"
    },
    "Nexa AI": {
      "desc": "Builds tools and small models for running AI on devices.",
      "web": "https://nexa.ai"
    },
    "NextEra Energy": {
      "desc": "Electric utility holding company and large developer of wind, solar and battery projects.",
      "web": "https://www.nexteraenergy.com"
    },
    "Noma Security": {
      "desc": "Security platform for finding and protecting AI agents and models.",
      "web": "https://noma.security"
    },
    "Nomi AI": {
      "desc": "Companion chatbot app with memory for friendship and role-play.",
      "web": "https://nomi.ai"
    },
    "Nomic AI": {
      "desc": "Embedding models and data maps, now AI for building design firms.",
      "web": "https://www.nomic.ai"
    },
    "Nomic Embed": {
      "desc": "Nomic AI's open embedding models for text and images.",
      "web": "https://www.nomic.ai"
    },
    "Norm Ai": {
      "desc": "Agents that check business work against laws and regulations.",
      "web": "https://www.norm.ai"
    },
    "Not Diamond": {
      "desc": "Picks the best model for each request automatically.",
      "web": "https://www.notdiamond.ai"
    },
    "Nota AI": {
      "desc": "Compresses and optimizes AI models to run on edge devices.",
      "web": "https://www.nota.ai"
    },
    "Notable Health": {
      "desc": "Automation for healthcare operations like patient intake, scheduling and paperwork.",
      "web": "https://www.notablehealth.com"
    },
    "NotebookLM": {
      "desc": "Google research notebook that answers questions and makes podcasts from your sources.",
      "web": "https://notebooklm.google"
    },
    "Notion AI": {
      "desc": "Notion's built-in assistant for writing, search and agents across workspace content.",
      "web": "https://www.notion.com/product/ai"
    },
    "Nous Research": {
      "desc": "Open-source research lab behind the Hermes language models.",
      "web": "https://nousresearch.com"
    },
    "Nova Act": {
      "desc": "Amazon toolkit for building agents that carry out actions in a web browser.",
      "web": "https://nova.amazon.com/act"
    },
    "NovelAI": {
      "desc": "Subscription service for generating stories and anime-style images.",
      "web": "https://novelai.net"
    },
    "Novita AI": {
      "desc": "Cloud platform offering model APIs and GPU instances for developers.",
      "web": "https://novita.ai"
    },
    "NRG Energy": {
      "desc": "Power producer and retail electricity and home services provider in North America.",
      "web": "https://www.nrg.com"
    },
    "Nscale": {
      "desc": "European GPU cloud building large AI data centers powered by renewables.",
      "web": "https://www.nscale.com"
    },
    "NTT DATA": {
      "desc": "IT services company that also operates one of the largest global data center portfolios.",
      "web": "https://www.nttdata.com"
    },
    "Nuro": {
      "desc": "Licenses self-driving software for passenger cars and robotaxis.",
      "web": "https://www.nuro.ai"
    },
    "NuScale Power": {
      "desc": "Small modular nuclear reactor design that can be combined into larger plants.",
      "web": "https://www.nuscalepower.com"
    },
    "nVent": {
      "desc": "Electrical enclosures, connections and liquid cooling systems for data centers.",
      "web": "https://www.nvent.com"
    },
    "Nvidia": {
      "desc": "GPUs, networking and software that dominate AI training and inference.",
      "web": "https://www.nvidia.com"
    },
    "Nvidia GR00T": {
      "desc": "Nvidia's foundation models and tools for humanoid robots.",
      "web": "https://developer.nvidia.com/isaac/gr00t"
    },
    "Nvidia Nemotron": {
      "desc": "Nvidia's open models and training datasets for building AI agents.",
      "web": "https://www.nvidia.com/en-us/ai-data-science/foundation-models/nemotron/"
    },
    "Nvidia rack-scale systems": {
      "desc": "Nvidia's complete rack systems that wire many GPUs into one large machine.",
      "web": "https://www.nvidia.com/en-us/data-center/gb200-nvl72/"
    },
    "NVLink / InfiniBand": {
      "desc": "Nvidia's networking that links GPUs within servers and across clusters.",
      "web": "https://www.nvidia.com/en-us/data-center/nvlink/"
    },
    "o9 Solutions": {
      "desc": "Planning software for demand, supply and revenue forecasting.",
      "web": "https://o9solutions.com"
    },
    "Oasis": {
      "desc": "Decart's real-time model that generates a playable game world.",
      "web": "https://oasis.decart.ai"
    },
    "Ocrolus": {
      "desc": "Document analysis that reads bank statements and pay stubs for lenders.",
      "web": "https://www.ocrolus.com"
    },
    "Odyssey": {
      "desc": "Builds world models that generate interactive video in real time.",
      "web": "https://odyssey.ml"
    },
    "Oklo": {
      "desc": "Developer of small fast-fission nuclear reactors to sell power directly to customers.",
      "web": "https://oklo.com"
    },
    "Ollama": {
      "desc": "Runs open models on your own computer with one command.",
      "web": "https://ollama.com"
    },
    "oneAPI": {
      "desc": "Intel's cross-architecture programming toolkit for CPUs, GPUs and accelerators.",
      "web": "https://www.intel.com/content/www/us/en/developer/tools/oneapi/overview.html"
    },
    "OneTrust AI Governance": {
      "desc": "OneTrust's module for inventorying AI systems and managing their risk.",
      "web": "https://www.onetrust.com/solutions/ai-governance/"
    },
    "ONNX Runtime": {
      "desc": "Microsoft's cross-platform engine for running models in ONNX format.",
      "web": "https://onnxruntime.ai"
    },
    "Onyx": {
      "desc": "Open-source workplace chat and search connected to company documents.",
      "web": "https://www.onyx.app"
    },
    "OpenAI": {
      "desc": "Maker of the GPT models and ChatGPT.",
      "web": "https://openai.com"
    },
    "OpenAI Agents SDK": {
      "desc": "OpenAI's lightweight library for building multi-agent workflows with tools.",
      "web": "https://openai.github.io/openai-agents-python/"
    },
    "OpenAI custom accelerator": {
      "desc": "OpenAI's in-house AI chip, designed with Broadcom for its own data centers.",
      "web": "https://openai.com"
    },
    "OpenAI embeddings": {
      "desc": "OpenAI's models that turn text into vectors for search.",
      "web": "https://platform.openai.com/docs/guides/embeddings"
    },
    "OpenAI Sora": {
      "desc": "OpenAI's video generation model and social video app.",
      "web": "https://openai.com/sora"
    },
    "OpenEvidence": {
      "desc": "Medical answer engine for doctors that cites clinical literature.",
      "web": "https://www.openevidence.com"
    },
    "OpenHands": {
      "desc": "Open-source platform for running coding agents that fix issues and write code.",
      "web": "https://www.all-hands.dev"
    },
    "Openlayer": {
      "desc": "Platform for testing, monitoring and governing AI systems.",
      "web": "https://www.openlayer.com"
    },
    "OpenPipe": {
      "desc": "Platform for fine-tuning smaller models to replace expensive LLM prompts.",
      "web": "https://openpipe.ai"
    },
    "OpenRouter": {
      "desc": "One API for reaching hundreds of models from many providers.",
      "web": "https://openrouter.ai"
    },
    "Opera Neon": {
      "desc": "Opera browser with agents that browse and complete tasks for you.",
      "web": "https://www.operaneon.com"
    },
    "Opik": {
      "desc": "Comet's open-source tool for tracing and evaluating LLM apps.",
      "web": "https://www.comet.com/site/products/opik/"
    },
    "Optimus": {
      "desc": "Tesla's humanoid robot meant for factory and general tasks.",
      "web": "https://www.tesla.com/AI"
    },
    "OpusClip": {
      "desc": "Tool that cuts long videos into short social clips.",
      "web": "https://www.opus.pro"
    },
    "Oracle": {
      "desc": "Database and enterprise software company whose cloud rents large GPU clusters.",
      "web": "https://www.oracle.com"
    },
    "Orbital Materials": {
      "desc": "Builds AI models that design new materials for industrial uses.",
      "web": "https://www.orbitalindustries.com"
    },
    "Otter": {
      "desc": "Meeting transcription and notes for calls and conversations.",
      "web": "https://otter.ai"
    },
    "Oumi": {
      "desc": "Open-source platform for training, evaluating, and deploying custom models.",
      "web": "https://oumi.ai"
    },
    "Oura Advisor": {
      "desc": "Chat assistant in the Oura app that interprets your sleep and health data.",
      "web": "https://ouraring.com"
    },
    "Outlier": {
      "desc": "Scale AI's platform where freelancers earn money training AI models.",
      "web": "https://outlier.ai"
    },
    "Overjet": {
      "desc": "Dental X-ray analysis that flags decay and supports insurance claims.",
      "web": "https://www.overjet.ai"
    },
    "OVHcloud": {
      "desc": "French cloud provider offering servers, GPUs, and AI services in Europe.",
      "web": "https://www.ovhcloud.com"
    },
    "Oxide Computer": {
      "desc": "Rack-scale cloud computers with integrated hardware and software for on-premises use.",
      "web": "https://oxide.computer"
    },
    "Oxylabs": {
      "desc": "Proxy and web scraping infrastructure for gathering public web data.",
      "web": "https://oxylabs.io"
    },
    "PaddlePaddle": {
      "desc": "Baidu's open-source deep learning framework, popular in China.",
      "web": "https://www.paddlepaddle.org.cn/en"
    },
    "Paige": {
      "desc": "Digital pathology software that helps pathologists spot cancer in tissue slides.",
      "web": "https://www.paige.ai"
    },
    "Pangea": {
      "desc": "Security guardrails for AI apps, now part of CrowdStrike.",
      "web": "https://pangea.cloud"
    },
    "Paradox": {
      "desc": "Recruiting assistant that screens candidates and schedules interviews by chat.",
      "web": "https://www.paradox.ai"
    },
    "Paragon": {
      "desc": "Integration platform for connecting SaaS apps and AI products.",
      "web": "https://www.useparagon.com"
    },
    "Parallel Domain": {
      "desc": "Simulated sensor data for training self-driving and robotics perception.",
      "web": "https://paralleldomain.com"
    },
    "Parallel Web Systems": {
      "desc": "Web search and research APIs built for AI agents.",
      "web": "https://parallel.ai"
    },
    "Parasail": {
      "desc": "Network that rents GPU capacity for deploying open models.",
      "web": "https://www.parasail.io"
    },
    "Parloa": {
      "desc": "Voice AI agents for enterprise customer service phone lines.",
      "web": "https://www.parloa.com"
    },
    "PathAI": {
      "desc": "Pathology tools that help labs and drug makers analyze tissue slides.",
      "web": "https://www.pathai.com"
    },
    "Pathway": {
      "desc": "Python framework for live data processing and real-time retrieval pipelines.",
      "web": "https://pathway.com"
    },
    "Patronus": {
      "desc": "Tools for automatically evaluating LLM outputs and catching errors.",
      "web": "https://www.patronus.ai"
    },
    "Patsnap": {
      "desc": "Patent and innovation search with analysis for research and IP teams.",
      "web": "https://www.patsnap.com"
    },
    "Payman": {
      "desc": "Banking and payment infrastructure that lets AI agents move money.",
      "web": "https://paymanai.com"
    },
    "Pebblely": {
      "desc": "Product photo generator that places items in new scenes.",
      "web": "https://pebblely.com"
    },
    "Pecan AI": {
      "desc": "Predictive analytics that lets business teams build forecasts without coding.",
      "web": "https://www.pecan.ai"
    },
    "Periodic Labs": {
      "desc": "Builds AI scientists and automated labs for materials and physics research.",
      "web": "https://periodic.com"
    },
    "Perplexity": {
      "desc": "Answer engine that searches the web and cites its sources.",
      "web": "https://www.perplexity.ai"
    },
    "Perplexity Comet": {
      "desc": "Web browser with a built-in assistant that browses and acts for you.",
      "web": "https://www.perplexity.ai/comet"
    },
    "Persana AI": {
      "desc": "Agents that find, research and reach out to sales prospects.",
      "web": "https://persana.ai"
    },
    "Phind": {
      "desc": "Answer engine for developers and technical questions.",
      "web": "https://www.phind.com"
    },
    "Photoroom": {
      "desc": "Product photo editor that removes backgrounds and creates listing images.",
      "web": "https://www.photoroom.com"
    },
    "Photoshop Generative Fill": {
      "desc": "Photoshop feature that adds, removes or extends image content from text prompts.",
      "web": "https://www.adobe.com/products/photoshop/generative-fill.html"
    },
    "Physical Intelligence": {
      "desc": "Builds general-purpose AI models that control many kinds of robots.",
      "web": "https://www.physicalintelligence.company"
    },
    "Pi": {
      "desc": "Personal chatbot designed for friendly, supportive conversation.",
      "web": "https://pi.ai"
    },
    "Pika": {
      "desc": "Consumer app for generating and remixing short videos with effects.",
      "web": "https://pika.art"
    },
    "Pindrop": {
      "desc": "Voice security that detects phone fraud and deepfake callers.",
      "web": "https://www.pindrop.com"
    },
    "Pinecone": {
      "desc": "Managed vector database for search and retrieval in AI apps.",
      "web": "https://www.pinecone.io"
    },
    "Pipecat": {
      "desc": "Open-source Python framework for real-time voice and multimodal agents.",
      "web": "https://www.pipecat.ai"
    },
    "Pipedream Connect": {
      "desc": "Pipedream's toolkit for adding managed app integrations and auth to AI products.",
      "web": "https://pipedream.com/connect"
    },
    "Pixelcut": {
      "desc": "Photo editor for background removal and product images.",
      "web": "https://www.pixelcut.ai"
    },
    "Plaud": {
      "desc": "Wearable voice recorder that transcribes and summarizes conversations.",
      "web": "https://www.plaud.ai"
    },
    "Playground": {
      "desc": "Image generator and editor for graphics like logos and posters.",
      "web": "https://playground.com"
    },
    "Plus AI": {
      "desc": "Add-on that generates and edits slides in Google Slides and PowerPoint.",
      "web": "https://plusai.com"
    },
    "Poe": {
      "desc": "Quora's app for chatting with many AI models in one place.",
      "web": "https://poe.com"
    },
    "PolyAI": {
      "desc": "Voice assistants that answer customer service phone calls for enterprises.",
      "web": "https://poly.ai"
    },
    "Pony.ai": {
      "desc": "Runs robotaxi and robotruck services in China and abroad.",
      "web": "https://pony.ai"
    },
    "Poolside": {
      "desc": "Builds foundation models and coding agents for enterprise software development.",
      "web": "https://poolside.ai"
    },
    "Portkey": {
      "desc": "Gateway for routing, monitoring, and governing LLM calls.",
      "web": "https://portkey.ai"
    },
    "Positron": {
      "desc": "Inference servers built for transformer models as an alternative to Nvidia GPUs.",
      "web": "https://www.positron.ai"
    },
    "Power BI Copilot": {
      "desc": "Assistant in Power BI that builds reports and answers data questions.",
      "web": "https://www.microsoft.com/en-us/power-platform/products/power-bi"
    },
    "Praktika": {
      "desc": "App for practicing languages through conversations with avatar tutors.",
      "web": "https://praktika.ai"
    },
    "Predibase": {
      "desc": "Platform for fine-tuning and serving small open models, now part of Rubrik.",
      "web": "https://predibase.com"
    },
    "Prefect": {
      "desc": "Python workflow orchestration platform for data and AI pipelines.",
      "web": "https://www.prefect.io"
    },
    "Prime Intellect": {
      "desc": "Decentralized AI training, open models, and a hub of RL environments.",
      "web": "https://www.primeintellect.ai"
    },
    "Prime Intellect Compute": {
      "desc": "Marketplace that finds and rents GPUs across many cloud providers.",
      "web": "https://www.primeintellect.ai"
    },
    "Profluent": {
      "desc": "Generative models for designing proteins and gene editors.",
      "web": "https://www.profluent.bio"
    },
    "Project Mariner": {
      "desc": "Google research agent that browses the web and completes tasks in Chrome.",
      "web": "https://deepmind.google/models/project-mariner/"
    },
    "Prolific": {
      "desc": "Paid online participant pool for research studies and AI human data.",
      "web": "https://www.prolific.com"
    },
    "Prompt Security": {
      "desc": "Protects companies from risks of employee and app use of generative AI.",
      "web": "https://prompt.security"
    },
    "Promptfoo": {
      "desc": "Open-source tool for testing and red-teaming LLM apps.",
      "web": "https://www.promptfoo.dev"
    },
    "ProRata.ai": {
      "desc": "Answer engine that shares revenue with publishers whose content it uses.",
      "web": "https://prorata.ai"
    },
    "Protect AI": {
      "desc": "Security scanning and protection for ML models and AI apps.",
      "web": "https://www.paloaltonetworks.com/prisma/prisma-ai-runtime-security"
    },
    "Protege": {
      "desc": "Marketplace that licenses de-identified health data for AI training.",
      "web": "https://www.withprotege.ai"
    },
    "ProWritingAid": {
      "desc": "Grammar and style checker for long-form and fiction writers.",
      "web": "https://prowritingaid.com"
    },
    "Pruna AI": {
      "desc": "Makes AI models smaller and faster through compression.",
      "web": "https://www.pruna.ai"
    },
    "Pure Storage": {
      "desc": "All-flash storage arrays and storage-as-a-service for enterprises and AI.",
      "web": "https://www.purestorage.com"
    },
    "Pydantic AI": {
      "desc": "Python framework for building type-safe LLM apps and agents.",
      "web": "https://ai.pydantic.dev"
    },
    "PyTorch": {
      "desc": "Open-source library for building and training deep learning models.",
      "web": "https://pytorch.org"
    },
    "Qdrant": {
      "desc": "Open-source vector database and search engine.",
      "web": "https://qdrant.tech"
    },
    "Qodo": {
      "desc": "Code review and test generation tools for enterprise developers.",
      "web": "https://www.qodo.ai"
    },
    "QTS Data Centers": {
      "desc": "Blackstone-owned developer and operator of large hyperscale and colocation data centers.",
      "web": "https://qtsdatacenters.com"
    },
    "Qualcomm": {
      "desc": "Mobile and PC chips with built-in NPUs for running AI on devices.",
      "web": "https://www.qualcomm.com"
    },
    "Qualcomm AI Hub": {
      "desc": "Qualcomm's service for optimizing models to run on Snapdragon devices.",
      "web": "https://aihub.qualcomm.com"
    },
    "Qualified (Piper)": {
      "desc": "Qualified's AI sales agent that chats with website visitors and books meetings.",
      "web": "https://www.qualified.com"
    },
    "Quanta Computer": {
      "desc": "Taiwanese manufacturer of laptops and cloud servers for hyperscalers.",
      "web": "https://www.quantatw.com"
    },
    "Quanta Services": {
      "desc": "Contractor that builds power grid, transmission and data center electrical infrastructure.",
      "web": "https://www.quantaservices.com"
    },
    "QuillBot": {
      "desc": "Paraphrasing, grammar checking and summarizing tool for writers.",
      "web": "https://quillbot.com"
    },
    "Qure.ai": {
      "desc": "Reads chest X-rays and CT scans to flag disease such as tuberculosis.",
      "web": "https://www.qure.ai"
    },
    "Qwen Chat": {
      "desc": "Alibaba's chat assistant built on its Qwen models.",
      "web": "https://chat.qwen.ai"
    },
    "Rad AI": {
      "desc": "Radiology tools that draft report impressions and manage follow-ups.",
      "web": "https://www.radai.com"
    },
    "Rafay": {
      "desc": "Platform for managing Kubernetes and running GPU clouds as a service.",
      "web": "https://rafay.co"
    },
    "Ragas": {
      "desc": "Open-source library for evaluating RAG and LLM applications.",
      "web": "https://www.ragas.io"
    },
    "Ragie": {
      "desc": "Managed service that ingests data and serves retrieval for AI apps.",
      "web": "https://www.ragie.ai"
    },
    "Raindrop": {
      "desc": "Monitoring that finds silent failures and user issues in AI apps.",
      "web": "https://www.raindrop.ai"
    },
    "Rapidus": {
      "desc": "Japanese government-backed chipmaker building a 2-nanometer factory in Hokkaido.",
      "web": "https://www.rapidus.inc"
    },
    "Rask": {
      "desc": "Video translation and dubbing with voice cloning and lip sync.",
      "web": "https://www.rask.ai"
    },
    "Ray Serve": {
      "desc": "Ray library for serving models as scalable online services.",
      "web": "https://docs.ray.io/en/latest/serve/index.html"
    },
    "Ray Train": {
      "desc": "Ray library for spreading model training across many machines.",
      "web": "https://docs.ray.io/en/latest/train/train.html"
    },
    "Read AI": {
      "desc": "Meeting recorder that summarizes calls, emails and messages.",
      "web": "https://www.read.ai"
    },
    "Reality Defender": {
      "desc": "Detection of deepfake audio, video and images.",
      "web": "https://www.realitydefender.com"
    },
    "Rebellions": {
      "desc": "South Korean designer of AI inference chips for data centers.",
      "web": "https://rebellions.ai"
    },
    "Recraft": {
      "desc": "Image generator and editor for designers, including vectors and brand styles.",
      "web": "https://www.recraft.ai"
    },
    "Recursion": {
      "desc": "Biotech using automated labs and machine learning to find new drugs.",
      "web": "https://www.recursion.com"
    },
    "Reddit": {
      "desc": "Online discussion forum that licenses its posts as AI training data.",
      "web": "https://www.redditinc.com"
    },
    "Redis": {
      "desc": "In-memory database for caching that also supports vector search.",
      "web": "https://redis.io"
    },
    "Reducto": {
      "desc": "Parses complex documents into structured data for AI apps.",
      "web": "https://reducto.ai"
    },
    "Reflection AI": {
      "desc": "Research lab building open-weight frontier models and coding agents.",
      "web": "https://reflection.ai"
    },
    "Regie.ai": {
      "desc": "Sales engagement platform with AI agents for prospecting and outreach.",
      "web": "https://www.regie.ai"
    },
    "Reka AI": {
      "desc": "Builds multimodal models that understand text, images, video, and audio.",
      "web": "https://reka.ai"
    },
    "Relevance AI": {
      "desc": "No-code platform for building teams of AI agents for business work.",
      "web": "https://relevanceai.com"
    },
    "RELEX Solutions": {
      "desc": "Demand forecasting and replenishment software for retailers.",
      "web": "https://www.relexsolutions.com"
    },
    "remove.bg": {
      "desc": "Canva's tool that removes image backgrounds automatically.",
      "web": "https://www.remove.bg"
    },
    "Rendered.ai": {
      "desc": "Platform for generating physics-based synthetic images for computer vision.",
      "web": "https://rendered.ai"
    },
    "Replicate": {
      "desc": "Runs open-source models in the cloud through a simple API.",
      "web": "https://replicate.com"
    },
    "Replika": {
      "desc": "Companion chatbot app for friendship and emotional support conversations.",
      "web": "https://replika.com"
    },
    "Replit": {
      "desc": "Browser-based platform where an agent builds and hosts apps from prompts.",
      "web": "https://replit.com"
    },
    "Requesty": {
      "desc": "Single API endpoint for accessing and controlling spend across LLMs.",
      "web": "https://www.requesty.ai"
    },
    "Resemble AI": {
      "desc": "Voice cloning, text-to-speech, and deepfake detection tools.",
      "web": "https://www.resemble.ai"
    },
    "Restate": {
      "desc": "Lightweight runtime for durable, fault-tolerant workflows and agents.",
      "web": "https://restate.dev"
    },
    "Retell": {
      "desc": "Platform for building, testing and deploying AI phone agents.",
      "web": "https://www.retellai.com"
    },
    "Rev": {
      "desc": "Transcription service and speech recognition for legal and investigative work.",
      "web": "https://www.rev.com"
    },
    "Reve": {
      "desc": "Image generation and editing model with strong prompt following.",
      "web": "https://reve.com"
    },
    "Riffusion": {
      "desc": "AI music agent, now called Producer, that creates songs from prompts.",
      "web": "https://www.producer.ai"
    },
    "Rillet": {
      "desc": "Accounting and ERP software that automates the monthly close for finance teams.",
      "web": "https://www.rillet.com"
    },
    "Rime": {
      "desc": "Text-to-speech voices built for customer-facing voice agents.",
      "web": "https://rime.ai"
    },
    "Riskified": {
      "desc": "Fraud screening with chargeback guarantees for online stores.",
      "web": "https://www.riskified.com"
    },
    "Roblox Cube": {
      "desc": "Roblox's model that generates 3D objects for games from text.",
      "web": "https://corp.roblox.com"
    },
    "Robust Intelligence": {
      "desc": "AI model validation and runtime protection, now part of Cisco AI Defense.",
      "web": "https://www.cisco.com/site/us/en/products/security/ai-defense/index.html"
    },
    "ROCm": {
      "desc": "AMD's ROCm (Radeon Open Compute), an open-source software stack for its GPUs.",
      "web": "https://www.amd.com/en/products/software/rocm.html"
    },
    "Rodin": {
      "desc": "Hyper3D's generator for high-quality 3D models from images or text.",
      "web": "https://hyper3d.ai"
    },
    "Rogo": {
      "desc": "Research assistant for bankers and investors that analyzes financial documents.",
      "web": "https://rogo.ai"
    },
    "Roots Automation": {
      "desc": "Agents that process insurance documents and back-office work, now called Bevaya.",
      "web": "https://www.bevaya.ai"
    },
    "Rosebud": {
      "desc": "Journaling app that asks questions and reflects your patterns back to you.",
      "web": "https://www.rosebud.app"
    },
    "Rossum": {
      "desc": "Document processing that extracts data from invoices and business documents.",
      "web": "https://rossum.ai"
    },
    "Rovo": {
      "desc": "Atlassian's search, chat and agents across Jira, Confluence and other apps.",
      "web": "https://www.atlassian.com/software/rovo"
    },
    "Rufus": {
      "desc": "Amazon's shopping assistant that answers product questions in the app.",
      "web": "https://www.amazon.com"
    },
    "Run:ai": {
      "desc": "Software that schedules and shares GPUs across Kubernetes clusters.",
      "web": "https://www.nvidia.com/en-us/software/run-ai/"
    },
    "Runloop": {
      "desc": "Cloud development boxes and benchmarks for building AI coding agents.",
      "web": "https://www.runloop.ai"
    },
    "RunPod": {
      "desc": "On-demand GPU pods and serverless GPUs for developers.",
      "web": "https://www.runpod.io"
    },
    "Runway": {
      "desc": "Video generation models and editing tools for filmmakers.",
      "web": "https://runwayml.com"
    },
    "Safe Superintelligence": {
      "desc": "Ilya Sutskever's research lab focused only on building safe superintelligence.",
      "web": "https://ssi.inc"
    },
    "Saidot": {
      "desc": "Platform for managing AI governance, risk and regulatory compliance.",
      "web": "https://www.saidot.ai"
    },
    "Sakana AI": {
      "desc": "Tokyo AI lab building nature-inspired models and AI for scientific research.",
      "web": "https://sakana.ai"
    },
    "Sakura Internet": {
      "desc": "Japanese hosting company running government-backed GPU cloud services for AI.",
      "web": "https://www.sakura.ad.jp"
    },
    "Salad": {
      "desc": "Cloud that runs AI inference on a distributed network of consumer GPUs.",
      "web": "https://salad.com"
    },
    "Sama": {
      "desc": "Data labeling and annotation services for computer vision and AI.",
      "web": "https://www.sama.com"
    },
    "SambaNova": {
      "desc": "Custom AI chips and a cloud service for running large models.",
      "web": "https://sambanova.ai"
    },
    "SambaNova Cloud": {
      "desc": "SambaNova's cloud API for fast inference on its own chips.",
      "web": "https://cloud.sambanova.ai"
    },
    "Samsung": {
      "desc": "Electronics giant that makes memory chips, including HBM for AI, plus phones.",
      "web": "https://www.samsung.com"
    },
    "Samsung Foundry": {
      "desc": "Samsung's contract chip manufacturing business for other companies' designs.",
      "web": "https://semiconductor.samsung.com/foundry/"
    },
    "Sana": {
      "desc": "Workplace assistant and learning platform that searches company knowledge.",
      "web": "https://sana.ai"
    },
    "Sanas": {
      "desc": "Real-time accent conversion and noise removal for call center voices.",
      "web": "https://www.sanas.ai"
    },
    "Sandisk": {
      "desc": "Flash memory and SSD maker spun out of Western Digital.",
      "web": "https://www.sandisk.com"
    },
    "Sardine": {
      "desc": "Fraud and financial crime prevention platform for banks and fintechs.",
      "web": "https://www.sardine.ai"
    },
    "Saronic": {
      "desc": "Builds autonomous uncrewed boats for naval and maritime missions.",
      "web": "https://www.saronic.com"
    },
    "Sarvam AI": {
      "desc": "Indian company building language models and voice AI for Indian languages.",
      "web": "https://www.sarvam.ai"
    },
    "Scale AI": {
      "desc": "Human-labeled training data and model evaluation for AI labs and governments.",
      "web": "https://scale.com"
    },
    "Scaleway": {
      "desc": "French cloud provider offering compute, storage and GPU instances.",
      "web": "https://www.scaleway.com"
    },
    "Scenario": {
      "desc": "Generates on-style game art and assets from a studio's own images.",
      "web": "https://www.scenario.com"
    },
    "Schneider Electric": {
      "desc": "Electrical distribution, cooling and energy management equipment, including for data centers.",
      "web": "https://www.se.com"
    },
    "Scholarcy": {
      "desc": "Tool that summarizes research papers into short flashcards.",
      "web": "https://www.scholarcy.com"
    },
    "SciSpace": {
      "desc": "Research assistant that finds, explains and summarizes academic papers.",
      "web": "https://scispace.com"
    },
    "Scite": {
      "desc": "Shows how research papers cite each other, supporting or contrasting claims.",
      "web": "https://scite.ai"
    },
    "Screenpipe": {
      "desc": "Open-source app that records your screen and audio for searchable memory.",
      "web": "https://screenpi.pe"
    },
    "Seagate": {
      "desc": "High-capacity hard disk drives for data centers and cloud storage.",
      "web": "https://www.seagate.com"
    },
    "Second Nature": {
      "desc": "Role-play simulator for practicing sales and workplace conversations.",
      "web": "https://secondnature.ai"
    },
    "Seedance": {
      "desc": "ByteDance's model that generates video clips from text or images.",
      "web": "https://seed.bytedance.com"
    },
    "Seedream": {
      "desc": "ByteDance's image generation and editing model.",
      "web": "https://seed.bytedance.com"
    },
    "Seeing AI": {
      "desc": "Microsoft's free app that describes text, people and scenes for blind users.",
      "web": "https://www.seeingai.com"
    },
    "Semantic Kernel": {
      "desc": "Microsoft's open-source SDK for building AI agents in apps.",
      "web": "https://learn.microsoft.com/en-us/semantic-kernel/"
    },
    "Semgrep Assistant": {
      "desc": "Semgrep's assistant that triages and explains code security findings.",
      "web": "https://semgrep.dev"
    },
    "Sensible": {
      "desc": "API for extracting structured data from documents.",
      "web": "https://www.sensible.so"
    },
    "SerpApi": {
      "desc": "API for scraping results from Google and other search engines.",
      "web": "https://serpapi.com"
    },
    "Serval": {
      "desc": "Help desk and access management platform where agents automate IT requests.",
      "web": "https://www.serval.com"
    },
    "Serve Robotics": {
      "desc": "Runs sidewalk robots that deliver food orders.",
      "web": "https://www.serverobotics.com"
    },
    "Sesame": {
      "desc": "Conversational voice companion and smart glasses that speak naturally.",
      "web": "https://www.sesame.com"
    },
    "Sesterce": {
      "desc": "French GPU cloud offering clusters and AI infrastructure in Europe.",
      "web": "https://www.sesterce.com"
    },
    "SF Compute": {
      "desc": "Marketplace for buying and selling short-term time on GPU clusters.",
      "web": "https://sfcompute.com"
    },
    "SGLang": {
      "desc": "Open-source fast serving framework for language and vision models.",
      "web": "https://sglang.ai"
    },
    "Shadeform": {
      "desc": "One console and API to rent GPUs from many cloud providers.",
      "web": "https://www.shadeform.ai"
    },
    "Shield AI": {
      "desc": "Builds Hivemind autopilot software and autonomous drones for the military.",
      "web": "https://shield.ai"
    },
    "Shift Technology": {
      "desc": "Fraud detection and claims automation software for insurers.",
      "web": "https://www.shift-technology.com"
    },
    "Showrunner": {
      "desc": "Platform for making and watching generated animated shows.",
      "web": "https://www.showrunner.xyz"
    },
    "Shutterstock": {
      "desc": "Stock image, video, and music library that licenses content for AI training.",
      "web": "https://www.shutterstock.com"
    },
    "Sidekick": {
      "desc": "Shopify's assistant that helps merchants run their online stores.",
      "web": "https://www.shopify.com/magic"
    },
    "Siemens Energy": {
      "desc": "Gas turbines, grid equipment and transformers for power generation and transmission.",
      "web": "https://www.siemens-energy.com"
    },
    "Sierra": {
      "desc": "Platform for companies to build customer service AI agents.",
      "web": "https://sierra.ai"
    },
    "Sift": {
      "desc": "Fraud prevention for online payments, accounts and content.",
      "web": "https://sift.com"
    },
    "SiliconFlow": {
      "desc": "Cloud platform for fast, low-cost access to open models.",
      "web": "https://www.siliconflow.com"
    },
    "SiMa.ai": {
      "desc": "System-on-chip and software for running AI in robots, cameras and machines.",
      "web": "https://sima.ai"
    },
    "Simular": {
      "desc": "Agent that operates a computer's apps and browser to finish tasks.",
      "web": "https://www.simular.ai"
    },
    "SingleStore": {
      "desc": "Database for fast analytics and transactions, with vector search.",
      "web": "https://www.singlestore.com"
    },
    "Sixfold": {
      "desc": "Underwriting assistant that reviews insurance submissions against carrier guidelines.",
      "web": "https://www.sixfold.ai"
    },
    "SK Hynix": {
      "desc": "Memory chipmaker and a major supplier of HBM for AI accelerators.",
      "web": "https://www.skhynix.com"
    },
    "Skild AI": {
      "desc": "Builds a general-purpose AI brain that works across robot types.",
      "web": "https://www.skild.ai"
    },
    "Skydio": {
      "desc": "Makes autonomous drones for defense, public safety and inspection.",
      "web": "https://www.skydio.com"
    },
    "Skyfire": {
      "desc": "Payment network and identity for AI agents to buy services.",
      "web": "https://skyfire.xyz"
    },
    "SkyPilot": {
      "desc": "Open-source tool that runs AI jobs across any cloud or cluster.",
      "web": "https://skypilot.ai"
    },
    "Slack AI": {
      "desc": "Slack's built-in AI for summarizing channels and searching conversations.",
      "web": "https://slack.com/ai"
    },
    "Sloyd": {
      "desc": "Generates customizable 3D models for games and apps.",
      "web": "https://www.sloyd.ai"
    },
    "Slurm": {
      "desc": "Open-source job scheduler that shares compute clusters among many users.",
      "web": "https://slurm.schedmd.com"
    },
    "Smartcat": {
      "desc": "Translation and localization platform for company content.",
      "web": "https://www.smartcat.com"
    },
    "SMIC": {
      "desc": "China's largest contract chipmaker, producing chips for domestic designers.",
      "web": "https://www.smics.com"
    },
    "smolagents": {
      "desc": "Hugging Face's small library for agents that act by writing code.",
      "web": "https://huggingface.co/docs/smolagents"
    },
    "Snorkel AI": {
      "desc": "Expert-labeled datasets, evaluations, and RL environments for AI models.",
      "web": "https://snorkel.ai"
    },
    "Snowflake Cortex": {
      "desc": "Snowflake's built-in models and services for search and analysis over its data.",
      "web": "https://www.snowflake.com/en/product/features/cortex/"
    },
    "Socure": {
      "desc": "Identity verification and fraud checks for online sign-ups.",
      "web": "https://www.socure.com"
    },
    "SoftBank": {
      "desc": "Japanese tech investor and telecom building AI data centers and infrastructure.",
      "web": "https://group.softbank/en"
    },
    "Sonar API": {
      "desc": "Perplexity's API for search-grounded answers with citations.",
      "web": "https://docs.perplexity.ai"
    },
    "Sonia": {
      "desc": "App offering talk-therapy sessions with a chatbot therapist.",
      "web": "https://www.soniahealth.com"
    },
    "Soniox": {
      "desc": "Multilingual real-time speech-to-text and translation models.",
      "web": "https://soniox.com"
    },
    "Sora app": {
      "desc": "OpenAI's app for generating and sharing short videos from prompts.",
      "web": "https://openai.com/sora"
    },
    "Sound Effects": {
      "desc": "ElevenLabs' tool that generates sound effects from text descriptions.",
      "web": "https://elevenlabs.io/sound-effects"
    },
    "Soundraw": {
      "desc": "Generates royalty-free music tracks for creators.",
      "web": "https://soundraw.io"
    },
    "SpAItial": {
      "desc": "Builds spatial foundation models that generate 3D worlds.",
      "web": "https://www.spaitial.ai"
    },
    "Speak": {
      "desc": "App for practicing spoken languages by talking with a tutor.",
      "web": "https://www.speak.com"
    },
    "Speechify": {
      "desc": "Text-to-speech app that reads documents, articles and books aloud.",
      "web": "https://speechify.com"
    },
    "Speechmatics": {
      "desc": "Speech recognition and voice agent technology in many languages.",
      "web": "https://www.speechmatics.com"
    },
    "Spellbook": {
      "desc": "Contract drafting and review assistant inside Microsoft Word for lawyers.",
      "web": "https://www.spellbook.legal"
    },
    "Spline AI": {
      "desc": "Spline's tools for generating 3D objects and scenes from prompts.",
      "web": "https://spline.design/ai"
    },
    "Spotter": {
      "desc": "ThoughtSpot agent that answers business data questions in plain English.",
      "web": "https://www.thoughtspot.com/product/agents/spotter"
    },
    "Stability AI": {
      "desc": "Maker of the open Stable Diffusion image models and creative tools.",
      "web": "https://stability.ai"
    },
    "Stable Audio": {
      "desc": "Stability AI's model for generating music and sound effects.",
      "web": "https://stableaudio.com"
    },
    "Stack AI": {
      "desc": "No-code platform for enterprises to build and deploy AI agents.",
      "web": "https://www.stackai.com"
    },
    "STACK Infrastructure": {
      "desc": "Developer and operator of hyperscale and wholesale data center campuses.",
      "web": "https://www.stackinfra.com"
    },
    "Stack Overflow": {
      "desc": "Programming question-and-answer site that licenses its content for AI training.",
      "web": "https://stackoverflow.co"
    },
    "Stardog": {
      "desc": "Knowledge graph platform for connecting enterprise data.",
      "web": "https://www.stardog.com"
    },
    "Stargate": {
      "desc": "OpenAI's joint venture building very large AI data center campuses in the US.",
      "web": "https://openai.com"
    },
    "Steel": {
      "desc": "Open-source cloud browser API for AI agents and web automation.",
      "web": "https://steel.dev"
    },
    "Steg.AI": {
      "desc": "Forensic watermarking to trace and authenticate images and documents.",
      "web": "https://steg.ai"
    },
    "StepFun": {
      "desc": "Chinese lab building Step multimodal and reasoning models.",
      "web": "https://www.stepfun.com"
    },
    "Stitch": {
      "desc": "Google's tool that generates app interface designs and front-end code.",
      "web": "https://stitch.withgoogle.com"
    },
    "Strands Agents": {
      "desc": "AWS open-source SDK for building model-driven agents in a few lines.",
      "web": "https://strandsagents.com"
    },
    "Stripe agent toolkit": {
      "desc": "Stripe's library for letting AI agents use Stripe payments and billing.",
      "web": "https://docs.stripe.com/agents"
    },
    "Stytch": {
      "desc": "Authentication and fraud-prevention APIs for apps and AI agents.",
      "web": "https://stytch.com"
    },
    "Submer": {
      "desc": "Immersion cooling tanks and data center infrastructure for high-density computing.",
      "web": "https://submer.com"
    },
    "Sudowrite": {
      "desc": "Writing assistant built for fiction authors.",
      "web": "https://www.sudowrite.com"
    },
    "Suki": {
      "desc": "Voice assistant that drafts clinical notes for doctors.",
      "web": "https://www.suki.ai"
    },
    "Suno": {
      "desc": "Generates full songs with vocals from text prompts.",
      "web": "https://suno.com"
    },
    "Supabase": {
      "desc": "Hosted Postgres platform with vector search via pgvector.",
      "web": "https://supabase.com"
    },
    "SuperAnnotate": {
      "desc": "Annotation platform and expert workforce for building AI training data.",
      "web": "https://www.superannotate.com"
    },
    "Supermemory": {
      "desc": "Memory and context API that gives AI apps long-term recall.",
      "web": "https://supermemory.ai"
    },
    "Supermicro": {
      "desc": "Servers and liquid-cooled GPU rack systems for AI data centers.",
      "web": "https://www.supermicro.com"
    },
    "Superwhisper": {
      "desc": "Offline voice-to-text dictation app for Mac and iOS.",
      "web": "https://superwhisper.com"
    },
    "Supio": {
      "desc": "Case file analysis and drafting software for plaintiff law firms.",
      "web": "https://www.supio.com"
    },
    "Surge AI": {
      "desc": "Expert human data and RLHF labeling for frontier AI labs.",
      "web": "https://www.surgehq.ai"
    },
    "Switch": {
      "desc": "Operator of large, high-density data center campuses in Nevada, Georgia and Texas.",
      "web": "https://www.switch.com"
    },
    "Symbotic": {
      "desc": "Robotic systems that automate storage and picking in warehouses.",
      "web": "https://www.symbotic.com"
    },
    "Synopsys": {
      "desc": "Electronic design automation software and chip IP for designing semiconductors.",
      "web": "https://www.synopsys.com"
    },
    "Synthesia": {
      "desc": "Business videos with digital avatars generated from text.",
      "web": "https://www.synthesia.io"
    },
    "Synthesis AI": {
      "desc": "Synthetic images of humans for training computer vision models.",
      "web": "https://synthesis.ai"
    },
    "Synthesis Tutor": {
      "desc": "Math tutor app for children that teaches through interactive lessons.",
      "web": "https://www.synthesis.com/tutor"
    },
    "Synthflow": {
      "desc": "No-code platform for building voice and chat agents for call centers.",
      "web": "https://synthflow.ai"
    },
    "SynthID": {
      "desc": "Google DeepMind's invisible watermarks for identifying AI-generated content.",
      "web": "https://deepmind.google/models/synthid/"
    },
    "Syntiant": {
      "desc": "Ultra-low-power AI chips for voice and sensor processing in small devices.",
      "web": "https://www.syntiant.com"
    },
    "Taalas": {
      "desc": "Chips that hard-wire a specific AI model into silicon for fast inference.",
      "web": "https://taalas.com"
    },
    "Tableau Agent": {
      "desc": "Tableau assistant that builds charts and analysis from plain-English questions.",
      "web": "https://www.tableau.com/products/tableau-agent"
    },
    "Tabnine": {
      "desc": "Code completion and chat assistant that companies can run privately.",
      "web": "https://www.tabnine.com"
    },
    "Talen Energy": {
      "desc": "Power producer that sells nuclear and gas electricity, including to data centers.",
      "web": "https://www.talenenergy.com"
    },
    "Talkie": {
      "desc": "App for chatting with user-created characters and companions.",
      "web": "https://www.talkie-ai.com"
    },
    "Tavily": {
      "desc": "Web search and extraction API for AI agents.",
      "web": "https://www.tavily.com"
    },
    "Tavus": {
      "desc": "Real-time video avatars that hold conversations.",
      "web": "https://www.tavus.io"
    },
    "Taylor & Francis": {
      "desc": "Academic publisher that licenses scholarly books and journals for AI use.",
      "web": "https://taylorandfrancis.com"
    },
    "Temporal": {
      "desc": "Open-source durable execution platform that keeps long-running workflows reliable.",
      "web": "https://temporal.io"
    },
    "Tencent Cloud": {
      "desc": "Tencent's cloud computing platform offering compute, storage and AI services.",
      "web": "https://www.tencentcloud.com"
    },
    "Tencent Hunyuan": {
      "desc": "Tencent's family of language, image, video, and 3D models.",
      "web": "https://hunyuan.tencent.com"
    },
    "Tennr": {
      "desc": "Software that reads patient referrals and faxes and moves them into care.",
      "web": "https://www.tennr.com"
    },
    "TensorDock": {
      "desc": "Marketplace for renting low-cost cloud GPUs from independent hosts.",
      "web": "https://www.tensordock.com"
    },
    "TensorFlow": {
      "desc": "Google's open-source library for building and deploying machine learning models.",
      "web": "https://www.tensorflow.org"
    },
    "Tensorlake": {
      "desc": "Document parsing API and serverless runtime for AI agents.",
      "web": "https://www.tensorlake.ai"
    },
    "Tensormesh (LMCache)": {
      "desc": "Caches model memory states to speed up and cheapen LLM serving.",
      "web": "https://www.tensormesh.ai"
    },
    "TensorRT Model Optimizer": {
      "desc": "Nvidia's library for quantizing and pruning models to run faster.",
      "web": "https://developer.nvidia.com/tensorrt"
    },
    "TensorRT-LLM": {
      "desc": "Nvidia's library for running LLMs fast on its GPUs.",
      "web": "https://developer.nvidia.com/tensorrt-llm"
    },
    "TensorWave": {
      "desc": "GPU cloud built entirely on AMD Instinct accelerators.",
      "web": "https://tensorwave.com"
    },
    "Tenstorrent": {
      "desc": "RISC-V based AI chips and open-source software, led by Jim Keller.",
      "web": "https://tenstorrent.com"
    },
    "TeraWulf": {
      "desc": "Bitcoin miner turning its power sites into data centers for AI and HPC tenants.",
      "web": "https://www.terawulf.com"
    },
    "TerraPower": {
      "desc": "Nuclear reactor developer building the sodium-cooled Natrium plant, founded by Bill Gates.",
      "web": "https://www.terrapower.com"
    },
    "TGI": {
      "desc": "Hugging Face's Text Generation Inference server for deploying text generation models.",
      "web": "https://huggingface.co/docs/text-generation-inference"
    },
    "Thinking Machines Lab": {
      "desc": "Mira Murati's AI lab building models and the Tinker fine-tuning service.",
      "web": "https://thinkingmachines.ai"
    },
    "Thoughtful AI": {
      "desc": "Automation agents that handle healthcare billing and revenue-cycle tasks.",
      "web": "https://www.thoughtful.ai"
    },
    "Thoughtly": {
      "desc": "No-code platform for deploying AI phone agents for sales and support.",
      "web": "https://www.thought.ly"
    },
    "TigerGraph": {
      "desc": "Graph database for large-scale connected-data analytics.",
      "web": "https://www.tigergraph.com"
    },
    "TII Falcon": {
      "desc": "Abu Dhabi research institute's family of open-weight language models.",
      "web": "https://falconllm.tii.ae"
    },
    "Timekettle": {
      "desc": "Translator earbuds and devices for face-to-face conversations.",
      "web": "https://www.timekettle.co"
    },
    "Tinker": {
      "desc": "Thinking Machines Lab's API for fine-tuning open-weight models.",
      "web": "https://thinkingmachines.ai/tinker/"
    },
    "tl;dv": {
      "desc": "Meeting recorder that transcribes calls and syncs notes to CRMs.",
      "web": "https://tldv.io"
    },
    "Together AI": {
      "desc": "Cloud for running, fine-tuning, and training open models on GPUs.",
      "web": "https://www.together.ai"
    },
    "Together Fine-Tuning": {
      "desc": "Together AI's service for fine-tuning open models on your data.",
      "web": "https://www.together.ai/fine-tuning"
    },
    "Tokyo Electron": {
      "desc": "Japanese maker of deposition, etch and coating equipment for chip manufacturing.",
      "web": "https://www.tel.com"
    },
    "Tolan": {
      "desc": "App with an animated alien companion you talk with.",
      "web": "https://www.tolans.com"
    },
    "TollBit": {
      "desc": "Lets publishers charge AI bots and crawlers for accessing their content.",
      "web": "https://tollbit.com"
    },
    "Toloka": {
      "desc": "Crowd and expert human data for training and evaluating AI models.",
      "web": "https://toloka.ai"
    },
    "Tomorrow.io": {
      "desc": "Weather forecasts and alerts for businesses, from its own satellites.",
      "web": "https://www.tomorrow.io"
    },
    "Tonic.ai": {
      "desc": "Synthetic and de-identified test data for software and AI development.",
      "web": "https://www.tonic.ai"
    },
    "Topaz Labs": {
      "desc": "Desktop software that upscales, sharpens and denoises photos and video.",
      "web": "https://www.topazlabs.com"
    },
    "TorchTitan": {
      "desc": "PyTorch-native library for large-scale model pretraining.",
      "web": "https://github.com/pytorch/torchtitan"
    },
    "Toyota Research Institute": {
      "desc": "Toyota's research arm working on robotics, driving, and AI.",
      "web": "https://www.tri.global"
    },
    "Traceloop": {
      "desc": "Monitoring for LLM apps based on OpenTelemetry, maker of OpenLLMetry.",
      "web": "https://www.traceloop.com"
    },
    "Tractable": {
      "desc": "Photo-based damage assessment for car and property insurance claims.",
      "web": "https://tractable.ai"
    },
    "Trane Technologies": {
      "desc": "Heating, ventilation and chillers, including thermal management for data centers.",
      "web": "https://www.tranetechnologies.com"
    },
    "Transformers": {
      "desc": "Hugging Face's library of ready-to-use pretrained model code.",
      "web": "https://huggingface.co/docs/transformers"
    },
    "Trigger.dev": {
      "desc": "Open-source platform for running background jobs and AI workflows in TypeScript.",
      "web": "https://trigger.dev"
    },
    "Tripo AI": {
      "desc": "Generates 3D models from text prompts or images.",
      "web": "https://www.tripo3d.ai"
    },
    "Triton": {
      "desc": "Python-like language and compiler for writing fast GPU kernels.",
      "web": "https://triton-lang.org"
    },
    "Triton Inference Server": {
      "desc": "Nvidia's open-source server for running models in production.",
      "web": "https://developer.nvidia.com/triton-inference-server"
    },
    "TRL": {
      "desc": "Hugging Face's library for fine-tuning models with reinforcement learning.",
      "web": "https://huggingface.co/docs/trl"
    },
    "Truepic": {
      "desc": "Tools to verify photos and attach provenance to digital content.",
      "web": "https://www.truepic.com"
    },
    "Trustible": {
      "desc": "Software that helps organizations govern AI use and meet regulations.",
      "web": "https://trustible.ai"
    },
    "TSMC": {
      "desc": "Taiwan Semiconductor Manufacturing Company, the contract chipmaker that makes most advanced AI chips.",
      "web": "https://www.tsmc.com"
    },
    "turbopuffer": {
      "desc": "Low-cost vector and full-text search built on object storage.",
      "web": "https://turbopuffer.com"
    },
    "Turing": {
      "desc": "Coding and reasoning training data plus engineering services for AI labs.",
      "web": "https://www.turing.com"
    },
    "Twelve Labs": {
      "desc": "Video understanding models that search and describe video content.",
      "web": "https://www.twelvelabs.io"
    },
    "Typeface": {
      "desc": "Brand-aware content generation for enterprise marketing teams.",
      "web": "https://www.typeface.ai"
    },
    "Udio": {
      "desc": "Generates songs and music tracks from text prompts.",
      "web": "https://www.udio.com"
    },
    "Uizard": {
      "desc": "Miro's tool that turns sketches and prompts into app mockups.",
      "web": "https://uizard.io"
    },
    "Ultravox": {
      "desc": "Open speech model and API for real-time voice AI.",
      "web": "https://www.ultravox.ai"
    },
    "Unbabel": {
      "desc": "Machine translation with human review for customer service and business content.",
      "web": "https://unbabel.com"
    },
    "Unify": {
      "desc": "Platform that finds buying signals and automates outbound sales.",
      "web": "https://www.unifygtm.com"
    },
    "Unit21": {
      "desc": "Fraud and anti-money-laundering monitoring platform for financial companies.",
      "web": "https://www.unit21.ai"
    },
    "Unitary": {
      "desc": "Reviews videos and images to automate content moderation workflows.",
      "web": "https://www.unitary.ai"
    },
    "Unitree Robotics": {
      "desc": "Chinese maker of low-cost quadruped and humanoid robots.",
      "web": "https://www.unitree.com"
    },
    "Unsloth": {
      "desc": "Open-source tool that fine-tunes language models faster with less memory.",
      "web": "https://unsloth.ai"
    },
    "Unstract": {
      "desc": "Open-source platform for extracting structured data from documents.",
      "web": "https://unstract.com"
    },
    "Unstructured": {
      "desc": "Turns messy documents into clean data that LLMs can use.",
      "web": "https://unstructured.io"
    },
    "Upstage": {
      "desc": "Korean company making Solar language models and document-processing AI.",
      "web": "https://www.upstage.ai"
    },
    "Upstart": {
      "desc": "Online lending marketplace using models to approve personal loans.",
      "web": "https://www.upstart.com"
    },
    "UpToDate Expert AI": {
      "desc": "Clinical answers for doctors drawn from the UpToDate medical reference.",
      "web": "https://www.wolterskluwer.com/en/solutions/uptodate"
    },
    "v0": {
      "desc": "Builds web interfaces and apps from text prompts.",
      "web": "https://v0.app"
    },
    "Valohai": {
      "desc": "Platform for running and tracking machine learning pipelines on any cloud.",
      "web": "https://valohai.com"
    },
    "Vals AI": {
      "desc": "Independent benchmarks of AI models on industry-specific tasks.",
      "web": "https://www.vals.ai"
    },
    "Valyu": {
      "desc": "Search API that gives agents web and licensed specialist data.",
      "web": "https://www.valyu.ai"
    },
    "Vanna AI": {
      "desc": "Open-source library that turns plain-English questions into SQL and charts.",
      "web": "https://vanna.ai"
    },
    "Vantage Data Centers": {
      "desc": "Builder and operator of hyperscale data center campuses across several continents.",
      "web": "https://vantage-dc.com"
    },
    "Vapi": {
      "desc": "Developer platform for building phone and voice AI agents.",
      "web": "https://vapi.ai"
    },
    "VAST Data": {
      "desc": "Storage and data platform software for large AI training and inference clusters.",
      "web": "https://www.vastdata.com"
    },
    "Vast.ai": {
      "desc": "Marketplace for renting GPUs from many independent hosts at low prices.",
      "web": "https://vast.ai"
    },
    "Vectorize": {
      "desc": "Builds data pipelines and memory tools for AI agents.",
      "web": "https://vectorize.io"
    },
    "Vectra AI": {
      "desc": "Threat detection and response across networks, identities and cloud.",
      "web": "https://www.vectra.ai"
    },
    "Vercel AI Gateway": {
      "desc": "Vercel's single endpoint for calling many model providers.",
      "web": "https://vercel.com/ai-gateway"
    },
    "Vercel AI SDK": {
      "desc": "Vercel's TypeScript library for building AI apps and agents.",
      "web": "https://ai-sdk.dev"
    },
    "Vercel Sandbox": {
      "desc": "Isolated cloud microVMs from Vercel for running untrusted code.",
      "web": "https://vercel.com/docs/vercel-sandbox"
    },
    "Vertex AI": {
      "desc": "Google Cloud's platform for building, training, and serving models.",
      "web": "https://cloud.google.com/vertex-ai"
    },
    "Vertiv": {
      "desc": "Power, cooling and rack equipment for data centers, including liquid cooling.",
      "web": "https://www.vertiv.com"
    },
    "Vespa.ai": {
      "desc": "Search and recommendation engine combining vectors, text, and ranking.",
      "web": "https://vespa.ai"
    },
    "Vic.ai": {
      "desc": "Accounts payable automation that processes and codes invoices.",
      "web": "https://www.vic.ai"
    },
    "Vidu": {
      "desc": "ShengShu's text-to-video and image-to-video generation model.",
      "web": "https://www.vidu.com"
    },
    "Vincent": {
      "desc": "vLex's legal research assistant over its global case law library.",
      "web": "https://vlex.com/vincent-ai"
    },
    "Visa Intelligent Commerce": {
      "desc": "Visa's program letting AI agents shop and pay with tokenized cards.",
      "web": "https://corporate.visa.com/en/products/intelligent-commerce.html"
    },
    "Vistra": {
      "desc": "Texas power producer and electricity retailer with nuclear, gas and solar plants.",
      "web": "https://www.vistracorp.com"
    },
    "Viz.ai": {
      "desc": "Detects strokes and other conditions in scans and alerts care teams.",
      "web": "https://www.viz.ai"
    },
    "vLLM": {
      "desc": "Open-source engine for fast, memory-efficient LLM serving.",
      "web": "https://vllm.ai"
    },
    "Vocode": {
      "desc": "Open-source library and platform for building voice phone agents.",
      "web": "https://www.vocode.dev"
    },
    "Voiceflow": {
      "desc": "Platform for designing and running customer-service chat and voice agents.",
      "web": "https://www.voiceflow.com"
    },
    "Voltage Park": {
      "desc": "Nonprofit-backed GPU cloud renting Nvidia H100 clusters at low prices.",
      "web": "https://www.voltagepark.com"
    },
    "Voxel51": {
      "desc": "FiftyOne tools for exploring and curating image and video datasets.",
      "web": "https://voxel51.com"
    },
    "Voyage AI": {
      "desc": "Embedding and reranking models for search, now owned by MongoDB.",
      "web": "https://www.voyageai.com"
    },
    "Vultr": {
      "desc": "Cloud provider offering virtual machines, bare metal and on-demand GPUs worldwide.",
      "web": "https://www.vultr.com"
    },
    "Wan": {
      "desc": "Alibaba's open-weight models that generate video from text or images.",
      "web": "https://wan.video"
    },
    "Warp": {
      "desc": "Terminal and development environment with built-in coding agents.",
      "web": "https://www.warp.dev"
    },
    "watsonx.governance": {
      "desc": "IBM's tools for tracking, monitoring and auditing AI models for compliance.",
      "web": "https://www.ibm.com/products/watsonx-governance"
    },
    "Waymo": {
      "desc": "Runs driverless robotaxi services in several US cities.",
      "web": "https://waymo.com"
    },
    "Wayve": {
      "desc": "Builds learned driving software that carmakers put into vehicles.",
      "web": "https://wayve.ai"
    },
    "WeatherNext": {
      "desc": "Google DeepMind's AI models for fast, probabilistic weather forecasting.",
      "web": "https://deepmind.google/science/weathernext/"
    },
    "Weave": {
      "desc": "Weights & Biases toolkit for tracing and evaluating LLM apps.",
      "web": "https://wandb.ai/site/weave/"
    },
    "Weaviate": {
      "desc": "Open-source vector database for search and AI apps.",
      "web": "https://weaviate.io"
    },
    "WebLLM": {
      "desc": "Runs language models directly in the web browser using the GPU.",
      "web": "https://webllm.mlc.ai"
    },
    "Websets": {
      "desc": "Exa tool that finds and verifies lists of companies, people or pages.",
      "web": "https://websets.exa.ai"
    },
    "Weights & Biases": {
      "desc": "Tracks machine learning experiments, models, and evaluations.",
      "web": "https://wandb.ai"
    },
    "WEKA": {
      "desc": "High-performance parallel file system software for AI and GPU clusters.",
      "web": "https://www.weka.io"
    },
    "WellSaid Labs": {
      "desc": "Text-to-speech voiceover platform for professional audio production.",
      "web": "https://wellsaidlabs.com"
    },
    "WeRide": {
      "desc": "Builds driverless robotaxis, robobuses and robosweepers for many countries.",
      "web": "https://www.weride.ai"
    },
    "Western Digital": {
      "desc": "Hard disk drives for data centers and consumers.",
      "web": "https://www.westerndigital.com"
    },
    "Whisper / gpt-realtime": {
      "desc": "OpenAI's speech recognition and real-time voice conversation models.",
      "web": "https://openai.com"
    },
    "Whoop Coach": {
      "desc": "Chat coach in the Whoop app that answers questions using your fitness data.",
      "web": "https://www.whoop.com"
    },
    "WhyHow.AI": {
      "desc": "Tools for building knowledge graphs for retrieval in AI apps.",
      "web": "https://whyhow.ai"
    },
    "Wiley": {
      "desc": "Academic publisher that licenses books and journals for AI training.",
      "web": "https://www.wiley.com"
    },
    "Willow Voice": {
      "desc": "Dictation app that writes text in any app on your computer.",
      "web": "https://willowvoice.com"
    },
    "Windows Recall": {
      "desc": "Windows feature that snapshots your screen so you can search past activity.",
      "web": "https://www.microsoft.com/windows/copilot-plus-pcs"
    },
    "Windsurf": {
      "desc": "Code editor with a built-in agent that writes and edits code.",
      "web": "https://windsurf.com"
    },
    "Wispr Flow": {
      "desc": "Voice dictation app that turns speech into polished text anywhere.",
      "web": "https://wisprflow.ai"
    },
    "Wistron": {
      "desc": "Taiwanese contract manufacturer of computers and AI servers.",
      "web": "https://www.wistron.com"
    },
    "Wiwynn": {
      "desc": "Taiwanese maker of servers and racks for cloud data centers.",
      "web": "https://www.wiwynn.com"
    },
    "Wondercraft": {
      "desc": "Studio for producing podcasts, audio ads and videos from text.",
      "web": "https://www.wondercraft.ai"
    },
    "Wordly": {
      "desc": "Live translated captions and audio for meetings and events.",
      "web": "https://www.wordly.ai"
    },
    "Wordtune": {
      "desc": "AI21's writing assistant that rewrites and summarizes text.",
      "web": "https://www.wordtune.com"
    },
    "Workato": {
      "desc": "Enterprise integration and automation platform with AI agents.",
      "web": "https://www.workato.com"
    },
    "Workers AI": {
      "desc": "Cloudflare's service for running models on its global network.",
      "web": "https://developers.cloudflare.com/workers-ai/"
    },
    "WorkOS": {
      "desc": "APIs that add enterprise sign-on, user management and agent auth to apps.",
      "web": "https://workos.com"
    },
    "World Labs": {
      "desc": "Builds world models that generate explorable 3D scenes.",
      "web": "https://www.worldlabs.ai"
    },
    "Wren AI": {
      "desc": "Open-source tool that turns plain-English questions into SQL queries.",
      "web": "https://getwren.ai"
    },
    "Writer": {
      "desc": "Enterprise platform for building agents and generating company content.",
      "web": "https://writer.com"
    },
    "Wysa": {
      "desc": "Chatbot coach for mental health support using therapy techniques.",
      "web": "https://www.wysa.com"
    },
    "X-energy": {
      "desc": "Developer of high-temperature gas-cooled small nuclear reactors and their fuel.",
      "web": "https://x-energy.com"
    },
    "x402": {
      "desc": "Open protocol for paying for web resources with stablecoins over HTTP.",
      "web": "https://www.x402.org"
    },
    "xAI": {
      "desc": "Elon Musk's AI company that makes the Grok models.",
      "web": "https://x.ai"
    },
    "XLA": {
      "desc": "Compiler that optimizes machine learning models for TPUs, GPUs and CPUs.",
      "web": "https://openxla.org"
    },
    "YData": {
      "desc": "Tools to profile data and generate synthetic tabular and time-series data."
    },
    "Yondr": {
      "desc": "Developer, owner and operator of hyperscale data centers in Europe, the Americas and Asia.",
      "web": "https://www.yondrgroup.com"
    },
    "Yoodli": {
      "desc": "Speech coach that gives feedback on talks, interviews and sales calls.",
      "web": "https://yoodli.ai"
    },
    "Yotta": {
      "desc": "Indian data center operator with a GPU cloud for AI workloads.",
      "web": "https://yotta.com"
    },
    "You.com": {
      "desc": "Web search APIs for AI apps, plus an AI search assistant.",
      "web": "https://you.com"
    },
    "Yuanbao": {
      "desc": "Tencent's chat assistant built on its Hunyuan and DeepSeek models.",
      "web": "https://yuanbao.tencent.com"
    },
    "Zapier": {
      "desc": "Automation service that connects thousands of apps, now with AI agents.",
      "web": "https://zapier.com"
    },
    "Zed": {
      "desc": "Fast open-source code editor with built-in agent and collaboration features.",
      "web": "https://zed.dev"
    },
    "Zendesk AI agents": {
      "desc": "Zendesk's AI agents that resolve customer service requests automatically.",
      "web": "https://www.zendesk.com/service/ai/ai-agents/"
    },
    "Zenity": {
      "desc": "Security platform for AI agents and low-code apps across enterprises.",
      "web": "https://zenity.io"
    },
    "Zenlytic": {
      "desc": "Data analyst assistant that answers business questions from company data.",
      "web": "https://www.zenlytic.com"
    },
    "Zep": {
      "desc": "Context and memory layer for agents built on a temporal knowledge graph.",
      "web": "https://www.getzep.com"
    },
    "ZeroEyes": {
      "desc": "Gun detection from existing security camera feeds.",
      "web": "https://zeroeyes.com"
    },
    "Zest AI": {
      "desc": "Credit underwriting models for lenders such as credit unions and banks.",
      "web": "https://www.zest.ai"
    },
    "ZestyAI": {
      "desc": "Property risk scores for insurers from aerial imagery and climate data.",
      "web": "https://www.zesty.ai"
    },
    "Zhipu AI (GLM)": {
      "desc": "Chinese lab building the open-weight GLM language models.",
      "web": "https://z.ai"
    },
    "Zipline": {
      "desc": "Delivers medical supplies and packages by autonomous drone.",
      "web": "https://www.zipline.com"
    },
    "Zoom AI Companion": {
      "desc": "Zoom's assistant that summarizes meetings and drafts follow-ups.",
      "web": "https://www.zoom.com/en/products/ai-assistant/"
    },
    "Zoox": {
      "desc": "Amazon-owned company running purpose-built driverless robotaxis.",
      "web": "https://zoox.com"
    },
    "Zyte": {
      "desc": "Web scraping API and services for extracting data from websites.",
      "web": "https://www.zyte.com"
    }
  },
  "layers": [
    {
      "id": "L1",
      "name": "Physical infrastructure",
      "hue": "peach",
      "tagline": "Where the power and floor space come from, increasingly the binding constraint on AI capacity.",
      "definition": "Physical infrastructure is the land, buildings, electricity and cooling that AI computers need. A large AI data center can use as much electricity as a small city. This layer supplies that power and the space for the computers.",
      "test": "Does it supply electricity, land, buildings or cooling for compute?",
      "buckets": [
        {
          "code": "1.1",
          "name": "Power generation and procurement",
          "desc": "Utilities, nuclear and gas deals, on-site generation",
          "companies": [
            "Constellation Energy",
            "Vistra",
            "NRG Energy",
            "Talen Energy",
            "NextEra Energy",
            "Dominion Energy",
            "Duke Energy",
            "Entergy",
            "Brookfield Renewable",
            "Bloom Energy",
            "Oklo",
            "NuScale Power",
            "Kairos Power",
            "X-energy",
            "TerraPower",
            "Fervo Energy",
            "Helion Energy",
            "Commonwealth Fusion Systems"
          ]
        },
        {
          "code": "1.2",
          "name": "Data center development and operation",
          "desc": "Hyperscale campuses, colocation (e.g. the Stargate sites)",
          "companies": [
            "Stargate~OpenAI",
            "Equinix",
            "Digital Realty",
            "QTS Data Centers",
            "Vantage Data Centers",
            "Aligned Data Centers",
            "CyrusOne",
            "STACK Infrastructure",
            "Switch?Switch data centers",
            "EdgeCore Digital Infrastructure",
            "Yondr",
            "AirTrunk",
            "NTT DATA",
            "Iron Mountain Data Centers",
            "Applied Digital",
            "Core Scientific",
            "IREN",
            "TeraWulf",
            "Lancium"
          ]
        },
        {
          "code": "1.3",
          "name": "Power and cooling equipment",
          "desc": "Liquid cooling, electrical gear, grid interconnection",
          "companies": [
            "Vertiv",
            "Schneider Electric",
            "Eaton",
            "ABB",
            "Siemens Energy",
            "GE Vernova",
            "Hitachi Energy",
            "Trane Technologies",
            "Johnson Controls",
            "nVent",
            "Cummins",
            "Caterpillar",
            "Quanta Services",
            "CoolIT Systems",
            "LiquidStack",
            "Motivair",
            "Submer",
            "GRC?Green Revolution Cooling",
            "JetCool",
            "Accelsius"
          ]
        }
      ]
    },
    {
      "id": "L2",
      "name": "Compute hardware",
      "hue": "peach",
      "tagline": "The chips and systems that run the math.",
      "definition": "Compute hardware is the physical equipment that does the calculations for AI. It includes the chips, the memory near the chips, the network that links chips together, and the servers that hold them. It also includes the low-level software that lets programs use the chips.",
      "test": "Is it a physical chip, system or the low-level software that makes that chip usable?",
      "buckets": [
        {
          "code": "2.1",
          "name": "Semiconductor manufacturing",
          "desc": "Foundry, advanced packaging such as CoWoS (Chip-on-Wafer-on-Substrate), lithography equipment, plus chip design tools and IP",
          "companies": [
            "TSMC",
            "ASML",
            "Samsung Foundry~Samsung",
            "Intel Foundry~Intel",
            "GlobalFoundries",
            "SMIC",
            "Rapidus",
            "Amkor Technology",
            "ASE Group",
            "Applied Materials",
            "Lam Research",
            "KLA",
            "Tokyo Electron",
            "Advantest",
            "Besi?BE Semiconductor Industries",
            "Synopsys",
            "Cadence",
            "Arm"
          ],
          "concepts": [
            "CoWoS packaging"
          ]
        },
        {
          "code": "2.2",
          "name": "Accelerators",
          "desc": "The processors that do the matrix math",
          "children": [
            {
              "code": "2.2.1",
              "name": "General-purpose GPUs",
              "desc": "GPU = Graphics Processing Unit; includes other general-purpose AI accelerators",
              "companies": [
                "Nvidia",
                "AMD",
                "Intel Gaudi~Intel",
                "Huawei Ascend~Huawei",
                "Cambricon",
                "Moore Threads",
                "Biren Technology",
                "MetaX"
              ]
            },
            {
              "code": "2.2.2",
              "name": "Hyperscaler custom ASICs",
              "desc": "ASIC = Application-Specific Integrated Circuit",
              "companies": [
                "Google TPU~Google",
                "AWS Trainium~AWS",
                "Meta MTIA~Meta",
                "Microsoft Maia~Microsoft",
                "AWS Inferentia~AWS",
                "OpenAI custom accelerator~OpenAI",
                "Broadcom XPUs~Broadcom",
                "Marvell custom silicon~Marvell",
                "Alchip"
              ]
            },
            {
              "code": "2.2.3",
              "name": "Inference-specialized chips",
              "desc": "Silicon built for serving models fast",
              "companies": [
                "Groq",
                "Cerebras",
                "Etched",
                "SambaNova",
                "Tenstorrent",
                "d-Matrix",
                "MatX",
                "Positron?Positron AI",
                "Taalas",
                "Fractile",
                "Graphcore",
                "Rebellions",
                "FuriosaAI",
                "Lightmatter"
              ]
            },
            {
              "code": "2.2.4",
              "name": "Edge and on-device NPUs",
              "desc": "NPU = Neural Processing Unit",
              "companies": [
                "Apple",
                "Qualcomm",
                "Intel",
                "MediaTek",
                "Google Tensor~Google",
                "Hailo",
                "Axelera AI",
                "Ambarella",
                "SiMa.ai",
                "Syntiant",
                "Kneron",
                "EdgeCortix"
              ]
            }
          ]
        },
        {
          "code": "2.3",
          "name": "Memory and storage",
          "desc": "HBM (High Bandwidth Memory) and AI storage",
          "companies": [
            "SK Hynix",
            "Samsung",
            "Micron",
            "VAST Data",
            "WEKA",
            "DDN",
            "Pure Storage",
            "NetApp",
            "Hammerspace",
            "Kioxia",
            "Sandisk",
            "Western Digital",
            "Seagate",
            "MinIO"
          ]
        },
        {
          "code": "2.4",
          "name": "Networking and interconnect",
          "desc": "NVLink, InfiniBand, AI Ethernet, optical interconnects",
          "companies": [
            "NVLink / InfiniBand~Nvidia",
            "Broadcom",
            "Arista",
            "Cisco",
            "Marvell",
            "Astera Labs",
            "Credo",
            "Juniper Networks~HPE",
            "Cornelis Networks",
            "Enfabrica",
            "Ayar Labs",
            "Celestial AI",
            "Coherent",
            "Lumentum",
            "Ciena"
          ],
          "concepts": [
            "Optical interconnects"
          ]
        },
        {
          "code": "2.5",
          "name": "Servers and integrated systems",
          "desc": "Racks and full systems",
          "companies": [
            "Supermicro",
            "Dell",
            "Nvidia rack-scale systems~Nvidia",
            "HPE",
            "Lenovo",
            "Foxconn",
            "Quanta Computer",
            "Wistron",
            "Wiwynn",
            "Inspur",
            "Celestica",
            "Gigabyte",
            "Oxide Computer"
          ]
        },
        {
          "code": "2.6",
          "name": "Hardware enablement software",
          "desc": "Compilers and kernel libraries",
          "companies": [
            "CUDA~Nvidia",
            "ROCm~AMD",
            "Triton~OpenAI",
            "XLA~Google",
            "oneAPI~Intel",
            "Modular",
            "Apache TVM?Apache TVM"
          ]
        }
      ]
    },
    {
      "id": "L3",
      "name": "Compute provisioning",
      "hue": "peach",
      "tagline": "Who rents out the hardware.",
      "definition": "Compute provisioning is the business of renting computers to other people. Most AI companies do not own their chips. They rent time on them from a cloud provider and pay only for what they use.",
      "test": "Is the customer paying for access to someone else's hardware?",
      "buckets": [
        {
          "code": "3.1",
          "name": "Hyperscalers",
          "desc": "The big general clouds",
          "companies": [
            "AWS",
            "Microsoft Azure~Microsoft",
            "GCP~Google",
            "Oracle",
            "Alibaba Cloud",
            "IBM Cloud~IBM",
            "Tencent Cloud",
            "Baidu AI Cloud"
          ]
        },
        {
          "code": "3.2",
          "name": "Neoclouds (GPU-first clouds)",
          "desc": "Clouds built around GPU capacity",
          "companies": [
            "CoreWeave",
            "Lambda?Lambda AI cloud",
            "Nebius",
            "Crusoe?Crusoe AI",
            "Fluidstack",
            "Voltage Park",
            "Nscale",
            "Vultr",
            "TensorWave",
            "Hyperbolic",
            "Denvr Dataworks",
            "DigitalOcean",
            "Genesis Cloud",
            "Sesterce",
            "Scaleway",
            "Firmus"
          ]
        },
        {
          "code": "3.3",
          "name": "GPU marketplaces and serverless GPU",
          "desc": "Rent by the second or from a marketplace",
          "companies": [
            "RunPod",
            "Vast.ai",
            "Modal",
            "SF Compute",
            "Prime Intellect Compute~Prime Intellect",
            "Shadeform",
            "TensorDock",
            "Akash Network",
            "io.net",
            "Salad?SaladCloud",
            "Beam?Beam Cloud",
            "Cerebrium",
            "Koyeb"
          ]
        },
        {
          "code": "3.4",
          "name": "Sovereign and national AI clouds",
          "desc": "Region-specific capacity built for data residency",
          "companies": [
            "G42",
            "Core42~G42",
            "HUMAIN",
            "Mistral Compute~Mistral AI",
            "Yotta?Yotta Data Services",
            "Krutrim Cloud~Krutrim",
            "E2E Networks",
            "Sakura Internet",
            "SoftBank",
            "Naver Cloud",
            "Deutsche Telekom Industrial AI Cloud~Deutsche Telekom",
            "OVHcloud"
          ]
        },
        {
          "code": "3.5",
          "name": "Cluster orchestration and scheduling",
          "desc": "Slurm, Kubernetes-based GPU schedulers",
          "companies": [
            "Slurm~SchedMD",
            "Run:ai~Nvidia",
            "Anyscale",
            "SkyPilot",
            "dstack",
            "Rafay",
            "ClearML"
          ],
          "concepts": [
            "Kubernetes GPU schedulers"
          ]
        }
      ]
    },
    {
      "id": "L4",
      "name": "Training data",
      "hue": "lilac",
      "tagline": "Data that goes into model weights.",
      "definition": "Training data is the text, images, audio and other examples that a model learns from. During training, the model adjusts its internal numbers (its weights) to match patterns in this data. After training, the data is part of the model and you cannot easily remove it.",
      "test": "Does this data end up baked into the weights during training?",
      "buckets": [
        {
          "code": "4.1",
          "name": "Human expert data and RLHF",
          "desc": "RLHF = Reinforcement Learning from Human Feedback",
          "companies": [
            "Scale AI",
            "Surge AI",
            "Mercor",
            "Turing?Turing AI",
            "Invisible Technologies",
            "Labelbox",
            "Snorkel AI",
            "micro1",
            "Handshake AI~Handshake",
            "Outlier~Scale AI",
            "Toloka",
            "Appen",
            "Sama",
            "iMerit",
            "Prolific",
            "SuperAnnotate",
            "Encord",
            "Datacurve",
            "CloudFactory",
            "Centaur Labs"
          ]
        },
        {
          "code": "4.2",
          "name": "RL environments",
          "desc": "RL = Reinforcement Learning. Simulated tasks and graders for training agentic and reasoning models",
          "companies": [
            "Mechanize",
            "Prime Intellect",
            "Halluminate",
            "Bespoke Labs",
            "Farama Foundation"
          ]
        },
        {
          "code": "4.3",
          "name": "Synthetic data generation",
          "desc": "Model-generated training data",
          "companies": [
            "MOSTLY AI",
            "Gretel~Nvidia",
            "Tonic.ai",
            "YData",
            "Synthesis AI",
            "Parallel Domain",
            "Duality Robotics",
            "Rendered.ai"
          ]
        },
        {
          "code": "4.4",
          "name": "Data licensing and marketplaces",
          "desc": "Publishers, Reddit, stock media",
          "companies": [
            "Reddit",
            "Shutterstock",
            "Getty Images",
            "Associated Press",
            "Axel Springer",
            "News Corp",
            "Stack Overflow",
            "Wiley",
            "Taylor & Francis",
            "Defined.ai",
            "Protege?Protege health data",
            "Human Native AI",
            "Created by Humans",
            "TollBit",
            "ProRata.ai"
          ],
          "concepts": [
            "Publishers",
            "Stock media"
          ]
        },
        {
          "code": "4.5",
          "name": "Web-scale data acquisition",
          "desc": "Crawling and scraping for pretraining",
          "companies": [
            "Common Crawl",
            "Bright Data",
            "Oxylabs",
            "Zyte",
            "Apify",
            "Diffbot"
          ]
        },
        {
          "code": "4.6",
          "name": "Data curation and processing",
          "desc": "Deduplication, filtering, data-mix optimization",
          "companies": [
            "DatologyAI",
            "Cleanlab",
            "Voxel51",
            "Nomic AI",
            "Activeloop",
            "Lilac~Databricks",
            "FineWeb datasets~Hugging Face"
          ]
        }
      ]
    },
    {
      "id": "L5",
      "name": "Models",
      "hue": "lilac",
      "tagline": "Trained weights, sorted by capability scope. Open-weight vs closed and size (frontier, mid-size, small/on-device) are tags, not buckets.",
      "definition": "A model is a large file of numbers, called weights, that a program learned during training. You give it an input, such as a question or an image, and it gives back an output. Some companies publish their weights openly, and others give access only through a paid service.",
      "test": "Is the product the trained weights themselves?",
      "buckets": [
        {
          "code": "5.1",
          "name": "General-purpose foundation models",
          "desc": "Broad models that do a bit of everything",
          "companies": [
            "OpenAI",
            "Anthropic",
            "Google DeepMind",
            "xAI",
            "Meta",
            "Mistral",
            "DeepSeek",
            "Alibaba Qwen~Alibaba?Alibaba Cloud",
            "Moonshot Kimi~Moonshot AI",
            "Cohere Command~Cohere",
            "Amazon Nova~Amazon",
            "Microsoft AI (MAI, Phi)~Microsoft",
            "AI21 Labs",
            "Reka AI",
            "Zhipu AI (GLM)~Zhipu AI",
            "MiniMax",
            "ByteDance Seed~ByteDance",
            "Baidu ERNIE~Baidu",
            "Tencent Hunyuan~Tencent",
            "StepFun",
            "01.AI",
            "Thinking Machines Lab",
            "Safe Superintelligence",
            "Reflection AI",
            "Nous Research",
            "Ai2 (OLMo)~Allen Institute for AI",
            "Sarvam AI",
            "Krutrim",
            "Aleph Alpha",
            "LG AI Research (EXAONE)~LG AI Research",
            "Naver HyperCLOVA X~Naver",
            "Sakana AI",
            "IBM Granite~IBM",
            "Nvidia Nemotron~Nvidia",
            "Liquid AI",
            "Upstage",
            "TII Falcon~Technology Innovation Institute"
          ]
        },
        {
          "code": "5.2",
          "name": "Modality-specialist models",
          "desc": "Best-in-class at one kind of media",
          "children": [
            {
              "code": "5.2.1",
              "name": "Image",
              "companies": [
                "Midjourney",
                "Black Forest Labs",
                "Ideogram",
                "Stability AI",
                "Recraft",
                "Krea",
                "Bria AI",
                "Reve?Reve AI",
                "GPT Image~OpenAI",
                "Imagen / Nano Banana~Google",
                "Seedream~ByteDance"
              ],
              "desc": "Models that generate or edit pictures from text or other images"
            },
            {
              "code": "5.2.2",
              "name": "Video",
              "companies": [
                "Runway",
                "Luma?Luma AI",
                "Kling~Kuaishou",
                "Google Veo~Google",
                "OpenAI Sora~OpenAI",
                "Pika",
                "Hailuo~MiniMax",
                "Genmo",
                "LTX~Lightricks",
                "Moonvalley",
                "Decart",
                "Wan~Alibaba",
                "Seedance~ByteDance",
                "HunyuanVideo~Tencent",
                "Vidu~ShengShu"
              ],
              "desc": "Models that generate video clips from text, images or other video"
            },
            {
              "code": "5.2.3",
              "name": "Speech and voice",
              "desc": "STT (Speech-to-Text), TTS (Text-to-Speech), speech-to-speech",
              "companies": [
                "ElevenLabs",
                "Cartesia",
                "Deepgram",
                "Kyutai",
                "AssemblyAI",
                "Speechmatics",
                "Rev?Rev.com",
                "Whisper / gpt-realtime~OpenAI",
                "Hume AI",
                "Sesame?Sesame AI",
                "Resemble AI",
                "Rime?Rime Labs",
                "Gladia",
                "Soniox",
                "LMNT",
                "Fish Audio",
                "WellSaid Labs"
              ]
            },
            {
              "code": "5.2.4",
              "name": "Music and audio",
              "companies": [
                "Suno",
                "Udio",
                "Stable Audio~Stability AI",
                "Lyria~Google DeepMind",
                "Eleven Music~ElevenLabs",
                "Riffusion",
                "Mubert"
              ],
              "desc": "Models that generate songs, sound effects and other audio"
            },
            {
              "code": "5.2.5",
              "name": "3D and world models",
              "desc": "3D = Three-Dimensional",
              "companies": [
                "World Labs",
                "Google Genie~Google DeepMind",
                "Odyssey?Odyssey ML",
                "Oasis~Decart",
                "Cosmos~Nvidia",
                "Hunyuan3D~Tencent",
                "CSM?Common Sense Machines",
                "SpAItial"
              ]
            }
          ]
        },
        {
          "code": "5.3",
          "name": "Domain-specialist models",
          "desc": "Code; biology and chemistry; materials; weather; math",
          "companies": [
            "Isomorphic Labs",
            "EvolutionaryScale",
            "Profluent",
            "Chai Discovery",
            "Generate:Biomedicines",
            "Recursion",
            "Inceptive",
            "Latent Labs",
            "Arc Institute (Evo)~Arc Institute",
            "Lila Sciences",
            "Orbital Materials",
            "CuspAI",
            "Periodic Labs",
            "WeatherNext~Google DeepMind",
            "Earth-2~Nvidia",
            "Brightband",
            "Jua",
            "Poolside",
            "Magic?Magic.dev",
            "Harmonic?Harmonic AI"
          ],
          "concepts": [
            "Code models",
            "Materials",
            "Weather"
          ]
        },
        {
          "code": "5.4",
          "name": "Component models",
          "desc": "Built as parts inside systems: embeddings, rerankers, document and OCR (Optical Character Recognition) models, safety classifiers",
          "companies": [
            "Cohere Embed and Rerank~Cohere",
            "Voyage AI~MongoDB",
            "Jina AI~Elastic",
            "Nomic Embed~Nomic AI",
            "Mixedbread",
            "OpenAI embeddings~OpenAI",
            "Mistral OCR~Mistral AI",
            "Llama Guard~Meta"
          ],
          "concepts": [
            "Embeddings",
            "Rerankers",
            "OCR models",
            "Safety classifiers"
          ]
        },
        {
          "code": "5.5",
          "name": "Embodied / robotics foundation models",
          "desc": "VLA (Vision-Language-Action) models",
          "companies": [
            "Physical Intelligence",
            "Skild AI",
            "Nvidia GR00T~Nvidia",
            "Gemini Robotics~Google DeepMind",
            "Figure Helix~Figure?Figure AI",
            "Field AI",
            "Genesis AI",
            "Dyna Robotics",
            "Generalist AI",
            "Wayve",
            "Toyota Research Institute"
          ]
        }
      ]
    },
    {
      "id": "L6",
      "name": "Model development tooling",
      "hue": "mint",
      "tagline": "Tools that create or change weights.",
      "definition": "Model development tooling is the software that people use to build a new model or change an existing one. It includes programs that run training across many chips, tools that adapt a model to one task (fine-tuning), and tools that make a model smaller. The result is always new or changed weights.",
      "test": "Does using it produce new or modified weights?",
      "buckets": [
        {
          "code": "6.1",
          "name": "ML frameworks",
          "desc": "ML = Machine Learning",
          "companies": [
            "PyTorch",
            "JAX~Google",
            "TensorFlow~Google",
            "Keras~Google",
            "Transformers~Hugging Face",
            "PaddlePaddle~Baidu",
            "MindSpore~Huawei"
          ]
        },
        {
          "code": "6.2",
          "name": "Distributed training",
          "desc": "Training across many accelerators",
          "companies": [
            "DeepSpeed~Microsoft",
            "Megatron~Nvidia",
            "NeMo~Nvidia",
            "MaxText~Google",
            "TorchTitan~Meta",
            "Ray Train~Anyscale",
            "Composer~Databricks",
            "Nanotron~Hugging Face",
            "Colossal-AI~HPC-AI Tech"
          ]
        },
        {
          "code": "6.3",
          "name": "Fine-tuning and post-training platforms",
          "desc": "Adapt a base model to a task",
          "companies": [
            "Unsloth",
            "Axolotl",
            "Tinker~Thinking Machines Lab",
            "OpenPipe",
            "Predibase",
            "Adaptive ML",
            "Arcee AI",
            "Oumi",
            "TRL~Hugging Face",
            "Together Fine-Tuning~Together AI"
          ]
        },
        {
          "code": "6.4",
          "name": "Model compression",
          "desc": "Quantization, distillation, pruning toolkits",
          "companies": [
            "Pruna AI",
            "Neural Magic~Red Hat",
            "TensorRT Model Optimizer~Nvidia",
            "Multiverse Computing",
            "Nota AI",
            "Clika",
            "Neural Compressor~Intel"
          ],
          "concepts": [
            "Quantization",
            "Distillation",
            "Pruning"
          ]
        },
        {
          "code": "6.5",
          "name": "Experiment tracking and model registry",
          "desc": "Keep track of runs and model versions",
          "companies": [
            "Weights & Biases",
            "MLflow~Databricks",
            "Comet?Comet ML",
            "Neptune.ai",
            "ClearML",
            "Valohai",
            "Hugging Face Hub~Hugging Face",
            "Amazon SageMaker~AWS",
            "Vertex AI~Google",
            "Azure Machine Learning~Microsoft"
          ]
        }
      ]
    },
    {
      "id": "L7",
      "name": "Inference",
      "hue": "mint",
      "tagline": "Tools and services that run weights.",
      "definition": "Inference means using a trained model to produce an answer. Training happens once, but inference happens each time someone asks the model a question. This layer holds the software and services that run models fast and at low cost.",
      "test": "Does it run existing weights to produce outputs?",
      "buckets": [
        {
          "code": "7.1",
          "name": "Serving engines",
          "desc": "High-throughput, server-side. LLM = Large Language Model",
          "companies": [
            "vLLM",
            "SGLang",
            "TensorRT-LLM~Nvidia",
            "TGI~Hugging Face",
            "Dynamo~Nvidia",
            "Triton Inference Server~Nvidia",
            "LMDeploy",
            "MLC LLM",
            "Ray Serve~Anyscale",
            "llm-d~Red Hat",
            "MAX~Modular",
            "BentoML",
            "KServe"
          ]
        },
        {
          "code": "7.2",
          "name": "Local and edge runtimes",
          "desc": "Single-device",
          "companies": [
            "llama.cpp?ggml",
            "Ollama",
            "LM Studio",
            "Apple MLX~Apple",
            "ExecuTorch~Meta",
            "Core ML~Apple",
            "LiteRT~Google",
            "ONNX Runtime~Microsoft",
            "Qualcomm AI Hub~Qualcomm",
            "Jan?Jan AI",
            "GPT4All~Nomic AI",
            "llamafile~Mozilla",
            "Nexa AI",
            "WebLLM"
          ]
        },
        {
          "code": "7.3",
          "name": "Runtime optimization",
          "desc": "Mostly features of serving engines, sometimes standalone startups",
          "companies": [
            "Tensormesh (LMCache)~Tensormesh",
            "CentML~Nvidia"
          ],
          "concepts": [
            "Continuous batching",
            "KV (Key-Value) cache management and offloading",
            "Speculative decoding",
            "Disaggregated prefill/decode"
          ]
        },
        {
          "code": "7.4",
          "name": "Inference providers",
          "desc": "Per-token API (Application Programming Interface) access",
          "companies": [
            "Together AI",
            "Fireworks",
            "Baseten",
            "DeepInfra",
            "Groq Cloud~Groq",
            "Replicate",
            "fal.ai",
            "Cerebras Inference~Cerebras",
            "SambaNova Cloud~SambaNova",
            "Amazon Bedrock~AWS",
            "Azure AI Foundry~Microsoft",
            "Nebius AI Studio~Nebius",
            "Inference Providers~Hugging Face",
            "Workers AI~Cloudflare",
            "Novita AI",
            "SiliconFlow",
            "FriendliAI",
            "Featherless AI",
            "Inference.net",
            "Parasail"
          ],
          "concepts": [
            "Labs' first-party APIs"
          ]
        },
        {
          "code": "7.5",
          "name": "Routing and gateways",
          "desc": "One API, many models",
          "companies": [
            "OpenRouter",
            "LiteLLM~BerriAI",
            "Portkey?Portkey AI",
            "Martian?Martian AI router",
            "Not Diamond",
            "Requesty",
            "AI Gateway~Cloudflare",
            "Vercel AI Gateway~Vercel",
            "Kong AI Gateway~Kong"
          ]
        }
      ]
    },
    {
      "id": "L8",
      "name": "Context and knowledge plumbing",
      "hue": "mint",
      "tagline": "Data fed to models at runtime (training data lives in L4).",
      "definition": "Context is the information that a system sends to a model together with a question. A model only knows what it learned in training, so a system often looks up current or private facts first. This layer finds those facts and puts them into the prompt (the text sent to the model).",
      "test": "Does it get data into the prompt at runtime?",
      "buckets": [
        {
          "code": "8.1",
          "name": "Document ingestion and parsing",
          "desc": "Turn files into model-ready text",
          "companies": [
            "Unstructured",
            "Reducto",
            "LlamaParse~LlamaIndex",
            "Docling~IBM",
            "Datalab (Marker)~Datalab",
            "Extend?Extend AI",
            "Tensorlake",
            "Unstract",
            "Aryn",
            "Sensible?Sensible.so",
            "Document Intelligence~Microsoft",
            "Document AI~Google",
            "Instabase"
          ]
        },
        {
          "code": "8.2",
          "name": "Vector databases",
          "desc": "Store and search embeddings",
          "companies": [
            "Pinecone",
            "Weaviate",
            "Qdrant",
            "Milvus~Zilliz",
            "Chroma",
            "LanceDB",
            "turbopuffer",
            "Vespa.ai",
            "Elasticsearch~Elastic",
            "Atlas Vector Search~MongoDB",
            "Redis",
            "SingleStore",
            "Marqo",
            "Supabase"
          ],
          "concepts": [
            "pgvector (open source)"
          ]
        },
        {
          "code": "8.3",
          "name": "Knowledge graphs and graph-based RAG",
          "desc": "RAG = Retrieval-Augmented Generation",
          "companies": [
            "Neo4j",
            "GraphRAG~Microsoft",
            "TigerGraph",
            "FalkorDB",
            "Memgraph",
            "Stardog",
            "ArangoDB",
            "WhyHow.AI",
            "Cognee"
          ]
        },
        {
          "code": "8.4",
          "name": "Web search and retrieval APIs for agents",
          "desc": "Give agents the live web",
          "companies": [
            "Exa?Exa AI",
            "Tavily",
            "Firecrawl",
            "Brave Search API~Brave",
            "Sonar API~Perplexity",
            "Parallel Web Systems",
            "Linkup",
            "You.com",
            "SerpApi",
            "Valyu",
            "Jina Reader~Jina AI"
          ]
        },
        {
          "code": "8.5",
          "name": "Data connectors and sync",
          "desc": "Pipelines that keep app data (Drive, Slack, CRMs, Customer Relationship Management systems) available to models",
          "companies": [
            "Airbyte",
            "Fivetran",
            "Merge?Merge API",
            "Paragon?Paragon integrations",
            "Nango",
            "Ragie",
            "Vectorize?Vectorize.io",
            "Graphlit",
            "Pathway?Pathway.com",
            "Estuary"
          ]
        }
      ]
    },
    {
      "id": "L9",
      "name": "Orchestration and agent infrastructure",
      "hue": "sky",
      "tagline": "What turns a model into a system.",
      "definition": "Orchestration is the work of connecting a model to tools, data and memory so that it can complete a task. An agent is a system that plans its own steps and uses tools to reach a goal. This layer holds the frameworks, standards and platforms that build these systems.",
      "test": "Does it wire models, tools and memory together into a working system?",
      "buckets": [
        {
          "code": "9.1",
          "name": "LLM application frameworks",
          "desc": "SDK = Software Development Kit",
          "companies": [
            "LangChain",
            "LlamaIndex",
            "DSPy",
            "Vercel AI SDK~Vercel",
            "Haystack~deepset",
            "Semantic Kernel~Microsoft",
            "Mastra",
            "Pydantic AI~Pydantic",
            "BAML~Boundary",
            "Genkit~Google",
            "Instructor"
          ]
        },
        {
          "code": "9.2",
          "name": "Agent frameworks and SDKs",
          "desc": "Libraries for building agent loops",
          "companies": [
            "LangGraph~LangChain",
            "CrewAI",
            "OpenAI Agents SDK~OpenAI",
            "Claude Agent SDK~Anthropic",
            "Google ADK~Google",
            "Microsoft Agent Framework (AutoGen)~Microsoft",
            "Strands Agents~AWS",
            "smolagents~Hugging Face",
            "Agno",
            "AG2",
            "CAMEL-AI"
          ]
        },
        {
          "code": "9.3",
          "name": "Protocols and standards",
          "desc": "Shared plumbing between agents and tools",
          "companies": [
            "MCP~Anthropic",
            "A2A~Google",
            "AG-UI~CopilotKit",
            "AP2 (Agent Payments Protocol)~Google",
            "ACP (Agentic Commerce Protocol)~OpenAI",
            "x402~Coinbase"
          ]
        },
        {
          "code": "9.4",
          "name": "Agent execution environments",
          "desc": "Where agents actually run",
          "children": [
            {
              "code": "9.4.1",
              "name": "Code sandboxes",
              "companies": [
                "E2B",
                "Daytona",
                "Modal Sandboxes~Modal",
                "Vercel Sandbox~Vercel",
                "Runloop",
                "CodeSandbox~Together AI",
                "Morph?Morph Labs"
              ],
              "desc": "Isolated computers where agents can run code safely"
            },
            {
              "code": "9.4.2",
              "name": "Browser infrastructure",
              "companies": [
                "Browserbase",
                "Browser Use",
                "Steel?Steel.dev",
                "Hyperbrowser",
                "Anchor Browser",
                "Kernel?Kernel browsers",
                "Browserless"
              ],
              "desc": "Remote web browsers that agents can control"
            },
            {
              "code": "9.4.3",
              "name": "Durable workflow execution",
              "companies": [
                "Temporal",
                "Inngest",
                "Restate",
                "Trigger.dev",
                "Hatchet",
                "DBOS",
                "Prefect"
              ],
              "desc": "Engines that keep long, multi-step agent jobs running through failures"
            }
          ]
        },
        {
          "code": "9.5",
          "name": "Agent memory",
          "desc": "Long-term state for agents",
          "companies": [
            "Mem0",
            "Letta",
            "Zep?Zep AI",
            "Supermemory",
            "LangMem~LangChain"
          ]
        },
        {
          "code": "9.6",
          "name": "Agent identity, tool auth and payments",
          "desc": "Let agents log in and pay",
          "companies": [
            "Composio",
            "Arcade?Arcade.dev",
            "Visa Intelligent Commerce~Visa",
            "Mastercard Agent Pay~Mastercard",
            "Stripe agent toolkit~Stripe",
            "Auth0 for AI Agents~Okta",
            "Stytch",
            "WorkOS",
            "Descope",
            "Keycard",
            "Skyfire",
            "Payman",
            "Nekuda",
            "Pipedream Connect~Pipedream"
          ],
          "concepts": [
            "Payment-network agent programs"
          ]
        },
        {
          "code": "9.7",
          "name": "Agent-builder platforms",
          "desc": "Build agents without writing the loop",
          "children": [
            {
              "code": "9.7.1",
              "name": "No/low-code workflow builders",
              "companies": [
                "n8n",
                "Zapier",
                "Dify",
                "Make?Make.com",
                "Relevance AI",
                "Gumloop",
                "Lindy",
                "Stack AI",
                "Flowise",
                "Langflow",
                "Copilot Studio~Microsoft",
                "AgentKit~OpenAI",
                "Voiceflow",
                "Botpress",
                "MindStudio",
                "Workato"
              ],
              "desc": "Visual tools for connecting models, apps and steps without much code"
            },
            {
              "code": "9.7.2",
              "name": "Voice-agent platforms",
              "companies": [
                "Vapi",
                "Retell?Retell AI",
                "Bland AI",
                "Synthflow",
                "Pipecat~Daily",
                "LiveKit Agents~LiveKit",
                "Ultravox~Fixie",
                "Vocode",
                "Thoughtly"
              ],
              "desc": "Platforms for building agents that talk on the phone or by voice"
            }
          ]
        }
      ]
    },
    {
      "id": "L10",
      "name": "LLMOps and trust",
      "hue": "sky",
      "tagline": "How AI systems are measured, secured and governed. LLMOps stands for LLM Operations.",
      "definition": "LLMOps (Large Language Model Operations) is the work of keeping an AI system correct, safe and under control after you build it. It includes tests that score the answers, logs that show what the system did, and filters that block harmful input or output. This layer watches and controls AI systems but does not run them.",
      "test": "Does it measure, secure or govern an AI system rather than run it?",
      "buckets": [
        {
          "code": "10.1",
          "name": "Evaluation",
          "desc": "Is the system any good?",
          "companies": [
            "Braintrust?Braintrust data",
            "LangSmith~LangChain",
            "Patronus?Patronus AI",
            "Galileo?Galileo AI",
            "Confident AI (DeepEval)~Confident AI",
            "Ragas",
            "Vals AI",
            "HoneyHive",
            "Weave~Weights & Biases",
            "Openlayer",
            "Coval",
            "Hamming AI",
            "LMArena"
          ]
        },
        {
          "code": "10.2",
          "name": "Observability and tracing",
          "desc": "What is it doing in production?",
          "companies": [
            "Arize",
            "Langfuse",
            "Helicone",
            "LLM Observability~Datadog",
            "Opik~Comet",
            "Laminar?Laminar AI",
            "Traceloop",
            "AgentOps",
            "Fiddler AI",
            "Arthur AI",
            "Raindrop?Raindrop AI"
          ]
        },
        {
          "code": "10.3",
          "name": "Guardrails and runtime security",
          "desc": "Prompt-injection defense, PII (Personally Identifiable Information) redaction, output filtering",
          "companies": [
            "Lakera~Check Point?Lakera",
            "Protect AI~Palo Alto Networks?Protect AI",
            "Prompt Security~SentinelOne?Prompt Security",
            "HiddenLayer",
            "Robust Intelligence~Cisco",
            "CalypsoAI~F5?CalypsoAI",
            "Pangea~CrowdStrike?Pangea",
            "Aim Security",
            "Noma Security",
            "Zenity",
            "Guardrails AI",
            "NeMo Guardrails~Nvidia"
          ]
        },
        {
          "code": "10.4",
          "name": "Red-teaming and model security testing",
          "desc": "Attack it before others do",
          "companies": [
            "Haize Labs",
            "Mindgard",
            "Promptfoo",
            "Gray Swan AI",
            "Irregular?Irregular AI security",
            "Apollo Research",
            "METR",
            "Adversa AI"
          ]
        },
        {
          "code": "10.5",
          "name": "GRC",
          "desc": "GRC = Governance, Risk and Compliance. Audit trails, EU (European Union) AI Act compliance, model inventories",
          "companies": [
            "Credo AI",
            "Holistic AI",
            "Trustible",
            "watsonx.governance~IBM",
            "OneTrust AI Governance~OneTrust",
            "FairNow",
            "Monitaur",
            "Saidot",
            "Enzai",
            "ModelOp"
          ]
        },
        {
          "code": "10.6",
          "name": "Content provenance",
          "desc": "Watermarking, C2PA (Coalition for Content Provenance and Authenticity)",
          "companies": [
            "SynthID~Google DeepMind",
            "C2PA",
            "Content Credentials~Adobe",
            "Truepic",
            "Digimarc",
            "Steg.AI",
            "IMATAG"
          ]
        }
      ]
    },
    {
      "id": "L11",
      "name": "Applications",
      "hue": "rose",
      "tagline": "Sorted by the main job the product does for its user, never by industry or modality.",
      "definition": "Applications are the AI products that people use to get work done, for example a chat assistant or a meeting note-taker. The customer buys the result, not the AI parts underneath it. This layer sorts each product by the main job that the model does for the user.",
      "test": "Does the customer use it to get work done (not to build AI)?",
      "isApps": true,
      "buckets": [
        {
          "code": "general",
          "label": "General",
          "name": "General assistants",
          "was": "A7",
          "desc": "Deliberately span all archetypes, with no dominant pattern.",
          "children": [
            {
              "code": "lab-native-assistants",
              "name": "Lab-native assistants",
              "companies": [
                "ChatGPT~OpenAI",
                "Claude~Anthropic",
                "Gemini~Google",
                "Grok~xAI",
                "Le Chat~Mistral AI",
                "DeepSeek app~DeepSeek",
                "Qwen Chat~Alibaba",
                "Kimi~Moonshot AI",
                "Doubao~ByteDance",
                "Yuanbao~Tencent",
                "ERNIE Bot~Baidu",
                "Poe~Quora"
              ],
              "was": "A7.1",
              "desc": "Chat assistants built by the labs that train the models"
            },
            {
              "code": "platform-embedded-assistants",
              "name": "Platform-embedded assistants",
              "companies": [
                "Meta AI~Meta",
                "Microsoft Copilot~Microsoft",
                "Apple Intelligence~Apple",
                "Microsoft 365 Copilot~Microsoft",
                "Alexa+~Amazon",
                "Galaxy AI~Samsung",
                "Notion AI~Notion",
                "Zoom AI Companion~Zoom",
                "Slack AI~Salesforce",
                "My AI~Snap",
                "Rufus~Amazon#Retail",
                "Sidekick~Shopify#Retail"
              ],
              "was": "A7.2",
              "desc": "Assistants built into an existing platform, app or device"
            }
          ]
        },
        {
          "code": "act",
          "label": "Act",
          "name": "Agents that do tasks",
          "was": "A1",
          "desc": "Executes multi-step tasks that change state in an external environment. Sub-buckets by where the agent works.",
          "children": [
            {
              "code": "customer-support",
              "name": "Customer support",
              "companies": [
                "Sierra?Sierra AI",
                "Decagon",
                "Intercom Fin~Intercom",
                "Agentforce~Salesforce",
                "Zendesk AI agents~Zendesk",
                "Ada?Ada support",
                "Forethought",
                "Crescendo?Crescendo AI",
                "Parloa",
                "PolyAI",
                "Cresta",
                "Maven AGI",
                "Lorikeet",
                "Kore.ai",
                "Netomi",
                "Gorgias AI~Gorgias#Retail"
              ],
              "was": "A1.1·a",
              "desc": "Agents that answer and resolve customer questions on their own"
            },
            {
              "code": "sales-and-marketing",
              "name": "Sales and marketing",
              "desc": "GTM = Go-To-Market. AI SDRs (Sales Development Representatives)",
              "companies": [
                "11x?11x.ai",
                "Artisan?Artisan AI",
                "Clay?Clay.com",
                "Qualified (Piper)~Qualified",
                "Regie.ai",
                "Unify?Unify GTM",
                "AiSDR",
                "Actively AI",
                "Persana AI"
              ],
              "was": "A1.1·b"
            },
            {
              "code": "back-office",
              "name": "Back-office",
              "desc": "Finance, IT (Information Technology) and HR (Human Resources) operations agents",
              "companies": [
                "Basis?Basis AI#Finance",
                "Rillet#Finance",
                "Digits#Finance",
                "Moveworks",
                "Serval?Serval IT",
                "Atomicwork",
                "Paradox?Paradox.ai",
                "Hippocratic AI#Healthcare",
                "Tennr#Healthcare",
                "Infinitus Systems#Healthcare",
                "Thoughtful AI#Healthcare",
                "Notable Health#Healthcare",
                "Assort Health#Healthcare",
                "EliseAI"
              ],
              "was": "A1.1·c"
            },
            {
              "code": "computer-use-and-browser-agents",
              "name": "Computer-use and browser agents",
              "desc": "Operate a screen like a person",
              "companies": [
                "ChatGPT agent mode~OpenAI",
                "Perplexity Comet~Perplexity",
                "Manus?Manus AI",
                "ChatGPT Atlas~OpenAI",
                "Claude for Chrome~Anthropic",
                "Project Mariner~Google",
                "Nova Act~Amazon",
                "Genspark",
                "Dia~The Browser Company",
                "Opera Neon~Opera",
                "Simular"
              ],
              "was": "A1.2"
            },
            {
              "code": "software-engineering-agents",
              "name": "Software-engineering agents",
              "desc": "Agents that write and ship code; app builders",
              "companies": [
                "Claude Code~Anthropic",
                "Codex~OpenAI",
                "Devin~Cognition?Cognition AI",
                "Cursor agent~Anysphere",
                "Lovable",
                "Bolt~StackBlitz",
                "Replit",
                "Windsurf~Cognition?Cognition AI",
                "Copilot coding agent~GitHub",
                "Jules~Google",
                "Gemini CLI~Google",
                "Kiro~AWS",
                "Junie~JetBrains",
                "Factory?Factory AI",
                "Augment Code",
                "Amp~Sourcegraph",
                "Cline",
                "Kilo Code",
                "OpenHands~All Hands AI",
                "Warp",
                "Zed?Zed Industries",
                "v0~Vercel",
                "Base44~Wix",
                "Emergent?Emergent Labs"
              ],
              "was": "A1.3",
              "seeAlso": [
                {
                  "code": "code-generation"
                }
              ]
            },
            {
              "code": "physical-world-agents",
              "name": "Physical-world agents",
              "desc": "Robots, AVs (Autonomous Vehicles), drones and defense",
              "companies": [
                "Figure?Figure AI#Manufacturing",
                "1X?1X Technologies",
                "Waymo",
                "Anduril#Government",
                "Optimus~Tesla#Manufacturing",
                "Agility Robotics#Manufacturing,Retail",
                "Apptronik#Manufacturing",
                "Boston Dynamics#Manufacturing",
                "Unitree Robotics",
                "Zoox~Amazon",
                "Aurora Innovation",
                "Kodiak Robotics",
                "Pony.ai",
                "Apollo Go~Baidu",
                "WeRide",
                "Nuro",
                "Shield AI#Government",
                "Skydio#Government",
                "Helsing#Government",
                "Saronic#Government",
                "Zipline#Healthcare,Retail",
                "Diligent Robotics#Healthcare",
                "Serve Robotics#Retail",
                "Dexterity#Retail",
                "Symbotic#Retail",
                "Bright Machines#Manufacturing",
                "Machina Labs#Manufacturing",
                "Hadrian#Manufacturing",
                "Carbon Robotics"
              ],
              "was": "A1.4"
            }
          ],
          "wasAlso": [
            "A1.1"
          ]
        },
        {
          "code": "interact",
          "label": "Interact",
          "name": "Companions and tutors",
          "was": "A2",
          "desc": "The ongoing interaction is itself the product.",
          "children": [
            {
              "code": "companions-and-social-characters",
              "name": "Companions and social characters",
              "companies": [
                "Character.ai",
                "Replika",
                "Talkie~MiniMax",
                "Chai?Chai Research",
                "Nomi AI",
                "Kindroid",
                "Grok companions~xAI",
                "Tolan~Portola",
                "Friend?Friend.com"
              ],
              "was": "A2.1",
              "desc": "Chat partners for friendship, role-play and social conversation"
            },
            {
              "code": "tutors-and-learning",
              "name": "Tutors and learning",
              "companies": [
                "Speak?Speak language learning#Education",
                "Duolingo Max~Duolingo#Education",
                "ChatGPT study mode~OpenAI#Education",
                "Praktika#Education",
                "Synthesis Tutor~Synthesis#Education",
                "Ello?Ello learning#Education",
                "Loora#Education",
                "Brainly#Education"
              ],
              "was": "A2.2",
              "desc": "Apps that teach a subject or a language through conversation"
            },
            {
              "code": "practice-and-simulation",
              "name": "Practice and simulation",
              "desc": "Interview and sales role-play trainers",
              "companies": [
                "Yoodli",
                "Hyperbound",
                "Second Nature?Second Nature AI",
                "Mursion#Education",
                "CAISY~Skillsoft"
              ],
              "was": "A2.3"
            },
            {
              "code": "coaching-and-wellbeing",
              "name": "Coaching and wellbeing",
              "desc": "Ongoing personal guidance",
              "companies": [
                "Wysa#Healthcare",
                "Ash~Slingshot AI#Healthcare",
                "Sonia?Sonia AI therapy#Healthcare",
                "Pi~Inflection AI",
                "Rosebud?Rosebud journal",
                "Ebb~Headspace#Healthcare",
                "Whoop Coach~Whoop#Healthcare",
                "Oura Advisor~Oura#Healthcare",
                "Lark Health#Healthcare",
                "BetterUp"
              ],
              "was": "A2.4"
            },
            {
              "code": "entertainment-and-game-characters",
              "name": "Entertainment and game characters",
              "companies": [
                "Inworld?Inworld AI#Media",
                "Convai#Media",
                "AI Dungeon~Latitude#Media",
                "Hidden Door#Media",
                "Showrunner~Fable Simulation#Media",
                "ACE~Nvidia#Media"
              ],
              "was": "A2.5",
              "desc": "Characters and stories that players talk to in games and fiction"
            }
          ]
        },
        {
          "code": "retrieve",
          "label": "Retrieve",
          "name": "Search and answers",
          "was": "A3",
          "desc": "Answers grounded in a knowledge source beyond the prompt. Sub-buckets by source.",
          "children": [
            {
              "code": "private-organizational-knowledge",
              "name": "Private organizational knowledge",
              "desc": "Glean, internal RAG assistants",
              "companies": [
                "Glean",
                "Hebbia#Finance,Legal",
                "Rovo~Atlassian",
                "Amazon Q Business~AWS",
                "Gemini Enterprise~Google",
                "Guru?Guru knowledge",
                "Sana~Workday",
                "Dashworks~HubSpot",
                "Coveo",
                "Onyx?Onyx AI",
                "Credal"
              ],
              "was": "A3.1"
            },
            {
              "code": "licensed-or-curated-domain-corpora",
              "name": "Licensed or curated domain corpora",
              "desc": "Answers from expert sources",
              "companies": [
                "Harvey?Harvey AI#Legal",
                "OpenEvidence#Healthcare",
                "CoCounsel~Thomson Reuters#Legal",
                "Lexis+ AI~LexisNexis#Legal",
                "Legora#Legal",
                "Vincent~vLex#Legal",
                "Rogo#Finance",
                "AlphaSense#Finance",
                "Fintool#Finance",
                "Brightwave#Finance",
                "Doximity GPT~Doximity#Healthcare",
                "UpToDate Expert AI~Wolters Kluwer#Healthcare",
                "Glass Health#Healthcare",
                "Elicit#Science",
                "Consensus?Consensus AI#Science",
                "Scite#Science",
                "Causaly#Science",
                "Patsnap#Science"
              ],
              "was": "A3.2"
            },
            {
              "code": "open-web",
              "name": "Open web",
              "desc": "Search engines and deep-research products",
              "companies": [
                "Perplexity",
                "ChatGPT deep research~OpenAI",
                "AI Mode~Google",
                "Grok DeepSearch~xAI",
                "Kagi Assistant~Kagi",
                "Phind",
                "You.com",
                "Websets~Exa?Exa AI"
              ],
              "was": "A3.3"
            },
            {
              "code": "structured-data",
              "name": "Structured data",
              "desc": "Text-to-SQL (Structured Query Language) and conversational BI (Business Intelligence)",
              "companies": [
                "Databricks Genie~Databricks",
                "Snowflake Cortex~Snowflake",
                "Spotter~ThoughtSpot",
                "Hex Magic~Hex?Hex Technologies",
                "Julius AI",
                "Tableau Agent~Salesforce",
                "Power BI Copilot~Microsoft",
                "Amazon Q in QuickSight~AWS",
                "Wren AI",
                "Vanna AI",
                "Zenlytic",
                "Fabi.ai"
              ],
              "was": "A3.4"
            },
            {
              "code": "media-archives",
              "name": "Media archives",
              "desc": "Video and image search",
              "companies": [
                "Twelve Labs#Media",
                "Ask Photos~Google",
                "Moments Lab#Media",
                "Coactive AI#Media"
              ],
              "was": "A3.5"
            },
            {
              "code": "personal-memory",
              "name": "Personal memory",
              "desc": "Search over one's own meetings, screen history, notes",
              "companies": [
                "Windows Recall~Microsoft",
                "NotebookLM~Google",
                "Limitless~Meta?Limitless AI",
                "Bee~Amazon?Bee AI",
                "Mem?Mem.ai",
                "Screenpipe"
              ],
              "was": "A3.6"
            }
          ]
        },
        {
          "code": "judge",
          "label": "Judge",
          "name": "Review and detection",
          "was": "A4",
          "desc": "Outputs a verdict, label, score or prediction about the input.",
          "children": [
            {
              "code": "classification-and-moderation",
              "name": "Classification and moderation",
              "companies": [
                "Hive?Hive AI#Media,Government",
                "ActiveFence#Media",
                "Checkstep#Media",
                "Unitary?Unitary AI#Media",
                "Cinder?Cinder trust and safety#Media",
                "Musubi#Media"
              ],
              "was": "A4.1",
              "desc": "Sort content into labels, or flag harmful content for removal"
            },
            {
              "code": "scoring-and-ranking",
              "name": "Scoring and ranking",
              "desc": "Candidate screening, lead scoring, underwriting",
              "companies": [
                "Eightfold AI",
                "HireVue",
                "Juicebox?Juicebox recruiting",
                "6sense",
                "Sixfold#Insurance",
                "Cytora#Insurance",
                "Federato#Insurance",
                "Zest AI#Finance",
                "Upstart#Finance"
              ],
              "was": "A4.2"
            },
            {
              "code": "detection",
              "name": "Detection",
              "desc": "Fraud, anomalies, deepfakes, visual defect inspection, medical imaging triage",
              "companies": [
                "Aidoc#Healthcare",
                "Viz.ai#Healthcare",
                "Qure.ai#Healthcare",
                "Lunit#Healthcare",
                "Paige?Paige AI#Healthcare",
                "PathAI#Healthcare",
                "Overjet#Healthcare",
                "Cleerly#Healthcare",
                "Tractable#Insurance",
                "Shift Technology#Insurance",
                "Sardine#Finance",
                "Feedzai#Finance",
                "Featurespace~Visa#Finance",
                "Unit21#Finance",
                "Socure#Finance",
                "Pindrop#Finance",
                "Sift?Sift fraud#Retail",
                "Riskified#Retail",
                "Forter#Retail",
                "Abnormal AI?Abnormal Security",
                "Darktrace",
                "Vectra AI",
                "Reality Defender#Media,Government",
                "GetReal Security#Government",
                "Landing AI#Manufacturing",
                "Instrumental#Manufacturing",
                "Elementary?Elementary ML#Manufacturing",
                "ZeroEyes#Government",
                "Flock Safety#Government"
              ],
              "was": "A4.3"
            },
            {
              "code": "review-and-audit",
              "name": "Review and audit",
              "desc": "Contract review, code review, compliance checks",
              "companies": [
                "CodeRabbit",
                "Greptile",
                "Bugbot~Anysphere",
                "Qodo",
                "Graphite?Graphite dev",
                "Semgrep Assistant~Semgrep",
                "Spellbook#Legal",
                "Ironclad AI~Ironclad#Legal",
                "LegalOn#Legal",
                "Luminance#Legal",
                "Kira~Litera#Legal",
                "Norm Ai#Finance",
                "Anterior#Healthcare",
                "Cohere Health#Healthcare"
              ],
              "was": "A4.4"
            },
            {
              "code": "prediction-and-forecasting",
              "name": "Prediction and forecasting",
              "desc": "Demand, risk, weather products",
              "companies": [
                "o9 Solutions#Retail,Manufacturing",
                "Blue Yonder#Retail",
                "RELEX Solutions#Retail",
                "Kinaxis#Manufacturing",
                "Aera Technology#Manufacturing",
                "Pecan AI",
                "Kumo AI",
                "Tomorrow.io",
                "Jupiter Intelligence#Insurance",
                "ZestyAI#Insurance"
              ],
              "was": "A4.5"
            }
          ]
        },
        {
          "code": "transform",
          "label": "Transform",
          "name": "Convert and edit",
          "was": "A5",
          "desc": "Re-expresses given content in a new form, with its information preserved.",
          "children": [
            {
              "code": "modality-conversion",
              "name": "Modality conversion",
              "desc": "Speech to text, text to speech (narration, audiobooks), image or document to text (OCR apps)",
              "companies": [
                "Wispr Flow~Wispr",
                "Otter",
                "Superwhisper",
                "Aqua Voice",
                "Willow Voice",
                "MacWhisper",
                "Speechify",
                "ElevenReader~ElevenLabs",
                "Murf AI",
                "Audible AI narration~Amazon#Media",
                "Be My Eyes",
                "Seeing AI~Microsoft"
              ],
              "was": "A5.1"
            },
            {
              "code": "language-conversion",
              "name": "Language conversion",
              "desc": "Translation, dubbing and live translation",
              "companies": [
                "DeepL",
                "ElevenLabs Dubbing~ElevenLabs#Media",
                "Rask?Rask AI#Media",
                "HeyGen Translate~HeyGen#Media",
                "Dubverse#Media",
                "Unbabel",
                "Lilt",
                "Smartcat",
                "Wordly?Wordly AI",
                "KUDO",
                "Sanas",
                "Timekettle",
                "Live Translation~Apple",
                "Google Translate~Google"
              ],
              "was": "A5.2"
            },
            {
              "code": "structure-conversion",
              "name": "Structure conversion",
              "desc": "Extraction and form-filling, invoice processing, ambient scribing and meeting notes",
              "companies": [
                "Abridge#Healthcare",
                "Granola?Granola AI",
                "Ambience Healthcare#Healthcare",
                "Dragon Copilot~Microsoft#Healthcare",
                "Suki#Healthcare",
                "Nabla#Healthcare",
                "DeepScribe#Healthcare",
                "Heidi Health#Healthcare",
                "Freed?Freed AI#Healthcare",
                "Rad AI#Healthcare",
                "Fireflies.ai",
                "Fathom?Fathom video",
                "Read AI",
                "tl;dv",
                "Plaud",
                "Supio#Legal",
                "Ocrolus#Finance",
                "Vic.ai#Finance",
                "Klarity#Finance",
                "Rossum",
                "Hyperscience#Government,Insurance",
                "Nanonets",
                "Roots Automation#Insurance"
              ],
              "was": "A5.3"
            },
            {
              "code": "length-and-style-conversion",
              "name": "Length and style conversion",
              "desc": "Summarization, rewriting, grammar",
              "companies": [
                "Grammarly",
                "QuillBot",
                "Wordtune~AI21 Labs",
                "LanguageTool",
                "ProWritingAid",
                "SciSpace#Science",
                "Scholarcy#Science"
              ],
              "was": "A5.4"
            },
            {
              "code": "media-enhancement-and-editing",
              "name": "Media enhancement and editing",
              "desc": "Upscaling, noise and background removal, footage editing. Agentic video editing lands here, since the footage already exists",
              "companies": [
                "Descript#Media",
                "Topaz Labs#Media",
                "Photoshop Generative Fill~Adobe#Media",
                "Captions?Captions app#Media",
                "OpusClip#Media",
                "CapCut~ByteDance#Media",
                "Gling#Media",
                "Magnific~Freepik",
                "Photoroom#Retail",
                "Pixelcut#Retail",
                "remove.bg~Canva",
                "Krisp"
              ],
              "was": "A5.5"
            }
          ]
        },
        {
          "code": "create",
          "label": "Create",
          "name": "Content generation",
          "was": "A6",
          "desc": "Generates novel content from intent. Sub-buckets by output.",
          "children": [
            {
              "code": "text-and-copy",
              "name": "Text and copy",
              "companies": [
                "Jasper",
                "Writer?Writer AI",
                "Copy.ai",
                "Typeface",
                "Anyword",
                "Hypotenuse AI#Retail",
                "HyperWrite~OthersideAI",
                "Sudowrite#Media",
                "NovelAI#Media",
                "EvenUp#Legal",
                "DraftWise#Legal"
              ],
              "was": "A6.1",
              "desc": "Write marketing copy, articles, stories and other text"
            },
            {
              "code": "image",
              "name": "Image",
              "companies": [
                "Midjourney app~Midjourney#Media",
                "Ideogram#Media",
                "Firefly~Adobe#Media",
                "Leonardo.Ai~Canva#Media",
                "Krea#Media",
                "Freepik AI~Freepik#Media",
                "Recraft",
                "Playground?Playground AI",
                "Lensa~Prisma Labs",
                "Civitai#Media",
                "Botika#Retail",
                "Flair.ai#Retail",
                "Pebblely#Retail"
              ],
              "was": "A6.2",
              "desc": "Apps for creating and editing pictures from a description"
            },
            {
              "code": "video",
              "name": "Video",
              "desc": "Including avatars and synthetic presenters",
              "companies": [
                "Runway#Media",
                "Sora app~OpenAI#Media",
                "Kling~Kuaishou#Media",
                "Synthesia",
                "HeyGen",
                "Pika#Media",
                "Dream Machine~Luma?Luma AI#Media",
                "Flow~Google#Media",
                "LTX Studio~Lightricks#Media",
                "Hedra#Media",
                "Higgsfield#Media",
                "invideo AI#Media",
                "Colossyan#Education",
                "D-ID",
                "Tavus",
                "Argil#Media",
                "Arcads#Retail",
                "Creatify#Retail"
              ],
              "was": "A6.3"
            },
            {
              "code": "audio-and-music",
              "name": "Audio and music",
              "desc": "Including sound effects",
              "companies": [
                "Suno#Media",
                "Udio#Media",
                "Sound Effects~ElevenLabs#Media",
                "AIVA#Media",
                "Soundraw#Media",
                "Beatoven.ai#Media",
                "Boomy#Media",
                "Loudly#Media",
                "Wondercraft#Media"
              ],
              "was": "A6.4"
            },
            {
              "code": "3d-assets-and-worlds",
              "name": "3D assets and worlds",
              "desc": "Game-asset tools",
              "companies": [
                "Meshy?Meshy AI#Media",
                "Tripo AI#Media",
                "Kaedim#Media",
                "Rodin~Hyper3D#Media",
                "Sloyd#Media",
                "Spline AI~Spline",
                "Scenario?Scenario gg#Media",
                "Layer AI#Media",
                "Roblox Cube~Roblox#Media"
              ],
              "was": "A6.5"
            },
            {
              "code": "design-documents-and-presentations",
              "name": "Design, documents and presentations",
              "companies": [
                "Canva AI~Canva",
                "Gamma?Gamma app",
                "Figma Make~Figma",
                "Adobe Express~Adobe",
                "Microsoft Designer~Microsoft",
                "Stitch~Google",
                "Uizard~Miro",
                "Beautiful.ai",
                "Napkin AI",
                "Plus AI",
                "Lovart",
                "Looka",
                "Kittl"
              ],
              "was": "A6.6",
              "desc": "Create slides, documents, designs and other visual layouts"
            },
            {
              "code": "code-generation",
              "name": "Code generation (single-shot)",
              "desc": "Autocomplete, snippet generation",
              "companies": [
                "Copilot autocomplete~GitHub",
                "Cursor Tab~Anysphere",
                "Tabnine",
                "Gemini Code Assist~Google",
                "Amazon Q Developer~AWS",
                "JetBrains AI Assistant~JetBrains",
                "Continue?Continue dev",
                "Mistral Code~Mistral AI"
              ],
              "was": "A6.7",
              "seeAlso": [
                {
                  "code": "software-engineering-agents"
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  "filterTags": [
    {
      "code": "F1",
      "name": "Industry",
      "desc": "Horizontal, legal, healthcare, finance, insurance, education, retail, manufacturing, media, government, science"
    },
    {
      "code": "F2",
      "name": "Business function",
      "desc": "Support, sales and marketing, engineering, finance, HR, legal, operations, IT and security, creative"
    },
    {
      "code": "F3",
      "name": "Interface modality",
      "desc": "Input → output, e.g. text→text, voice→voice, text→video, sensors→action"
    },
    {
      "code": "F4",
      "name": "Customer",
      "desc": "Developer, consumer, prosumer, SMB (Small & Medium Business), enterprise, government"
    },
    {
      "code": "F5",
      "name": "Autonomy",
      "desc": "Copilot (human drives), agent (human approves), autonomous"
    },
    {
      "code": "F6",
      "name": "Pricing",
      "desc": "Per-seat, usage or per-token, per-outcome, freemium"
    },
    {
      "code": "F7",
      "name": "Deployment",
      "desc": "Cloud API, self-hosted or on-prem, on-device"
    },
    {
      "code": "F8",
      "name": "Form factor",
      "desc": "Standalone app, embedded in existing software, browser, API-only, device or wearable"
    },
    {
      "code": "F9",
      "name": "Model strategy",
      "desc": "Own model, fine-tuned open-weight, third-party API"
    },
    {
      "code": "F10",
      "name": "Secondary archetypes",
      "desc": "E.g. Harvey: Search and answers primary, Content generation and Review and detection secondary"
    }
  ],
  "rules": [
    {
      "rule": "The unit is a product, not a company.",
      "example": "ElevenLabs' TTS API sits in Models › Speech and voice and in Inference › Inference providers, its dubbing tool in Convert and edit › Language conversion, its agent platform in Orchestration › Voice-agent platforms."
    },
    {
      "rule": "Builder vs. user.",
      "example": "If the customer uses it to build AI, it goes in L1 to L10. If the customer uses it to get work done, it goes in L11."
    },
    {
      "rule": "Training vs. runtime.",
      "example": "Data for weights goes in L4, data for prompts in L8. Tools that change weights go in L6, tools that run weights in L7."
    },
    {
      "rule": "One primary archetype in L11:",
      "example": "whatever the customer pays for. Other patterns go in F10."
    },
    {
      "rule": "Tie-breaker order:",
      "example": "Act → Interact → Retrieve → Judge → Transform → Create. General assistants holds only products designed with no dominant pattern."
    }
  ]
};
