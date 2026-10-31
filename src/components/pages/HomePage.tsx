import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Image } from '@/components/ui/image';
import { Link } from 'react-router-dom';

export default function AcademyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full bg-gradient-to-b from-background to-secondary py-16 md:py-24">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h1 className="font-heading text-5xl md:text-6xl text-primary mb-4">Academia</h1>
            <p className="font-paragraph text-lg text-secondary max-w-2xl">
              Aprende todo sobre nuestros productos, técnicas de aplicación y guías de color para encontrar la extensión perfecta para ti.
            </p>
          </div>
        </section>

        {/* Color Guide Featured Block */}
        <section className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div>
                <h2 className="font-heading text-4xl md:text-5xl text-primary mb-6">
                  Guía de Color
                </h2>
                <p className="font-paragraph text-lg text-secondary mb-8 leading-relaxed">
                  Descubre nuestra completa guía de colores interactiva. Explora todos los tonos disponibles, visualiza cómo se vería cada color y encuentra la combinación perfecta para tu estilo.
                </p>
                <Link
                  to="/academy/color-ring"
                  className="inline-block bg-primary text-primary-foreground font-paragraph px-8 py-3 rounded-lg hover:bg-secondary transition-colors"
                >
                  Explorar Guía de Color
                </Link>
              </div>

              {/* Visual Element */}
              <div className="rounded-lg overflow-hidden min-h-[300px]">
                <Image
                  src="https://static.wixstatic.com/media/37e681_afaa5974b3854f918d8e59af7e06da4b~mv2.png?originWidth=576&originHeight=384"
                  alt="Colorful hair - vibrant pink, blue, and purple waves"
                  width={576}
                  height={384}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <KnowledgeSection />

        {/* Additional Resources Section */}
        <section className="w-full py-16 md:py-24 bg-background">
          <div className="max-w-[100rem] mx-auto px-4 md:px-8">
            <h2 className="font-heading text-4xl text-primary mb-12 text-center">
              Más Recursos
            </h2>
            <p className="font-paragraph text-lg text-secondary text-center max-w-2xl mx-auto">
              Accede a nuestras guías de aplicación y aprende las mejores técnicas para cada tipo de extensión.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

const KNOWLEDGE_ARTICLES = [{"id":"metodos-de-colocacion-de-extensiones","title":"Métodos de colocación: entiende la fijación antes de comparar tiempos","summary":"Microanillos, queratina, cinta y costura: compara cómo se fijan y qué debes confirmar antes de reservar.","intro":"No todas las extensiones se instalan de la misma manera. El nombre de una punta no basta para elegir herramienta, adhesivo o técnica: confirma la ficha del producto y el sistema para el que fue diseñado.","headers":["Familia","Cómo funciona","Calor o adhesivo","Qué confirmar"],"rows":[["I-Tip para microanillos","Mechones individuales sujetos mediante anillos compatibles","En los sistemas BELLAMI I-Tip y Donna Bella I-Link consultados, sin calor ni adhesivo","Compatibilidad de punta y anillo; distribución y carga adecuadas para el cabello natural."],["Unión de queratina","Una punta preformada crea la unión mediante el procedimiento del sistema","Donna Bella Kera-Link utiliza calor; no extrapolar a toda tecnología de unión","Fórmula de unión, herramienta y protocolo de colocación y retiro. La forma U/V/I por sí sola no autoriza una técnica."],["Tape-In","Paneles fijados mediante cinta adhesiva diseñada para extensiones","Adhesivo; el sistema Donna Bella consultado no requiere calor","Cinta y removedor compatibles, preparación y cuidados específicos."],["Weft cosida","Una cortina se incorpora por costura a una base de instalación","La fijación por costura no equivale a una unión térmica","Construcción de la cortina, base compatible, distribución del peso y plan de mantenimiento."]],"note":"Estos ejemplos explican familias técnicas; no certifican compatibilidad con un SKU Luxhair.","sections":[{"title":"¿Cuánto tarda una colocación?","paragraphs":["No hay una duración única. El tiempo cambia según la cantidad de extensiones, el objetivo y el producto. Great Lengths recomienda obtener la estimación durante la consulta.","Para comparar cotizaciones, pide que indiquen si el tiempo incluye diagnóstico, preparación, retiro previo, colocación, corte de integración y peinado. Una cifra sin ese alcance no permite comparar dos servicios.","En Luxhair: confirma primero la referencia del producto. El tiempo estimado y la técnica deben corresponder a esa referencia y al servicio concreto, no a una tabla genérica de otra marca."]},{"title":"Profesional antes que improvisación","paragraphs":["Estos esquemas explican diferencias; no sustituyen formación práctica ni son instrucciones de autoaplicación. Una técnica sin calor también requiere controlar la tensión y la distribución del peso. Si la colocación duele, solicita corrección; no normalices el dolor."]}],"closing":"Para tu consulta: lleva tu objetivo de largo o volumen, tu rutina y el nombre exacto del producto. Pide un plan que incluya colocación, mantenimiento y retiro."},{"id":"duracion-y-mantenimiento-de-extensiones","title":"Duración y mantenimiento: no son lo mismo","summary":"Aprende a distinguir la próxima cita de mantenimiento de la vida útil del cabello de tus extensiones.","intro":"Cada sistema necesita su propio plan.","headers":["Sistema","Qué se revisa en la cita","Ejemplo publicado por el fabricante","Reutilización"],"rows":[["I-Tip con microanillos","Crecimiento, posición y estado de las fijaciones","BELLAMI I-Tip: recolocación cada 6–8 semanas","BELLAMI contempla reutilización de su cabello; no constituye una promesa para otros productos."],["Unión de queratina / pre-bonded","Estado de la unión y del cabello natural; momento del retiro profesional","Great Lengths Pre-bonded: hasta cinco meses, según cuidado y aplicación","No asumir que el sistema se puede recolocar como un microanillo. Confirmar el protocolo del producto."],["Tape-In","Estado del adhesivo y crecimiento; necesidad de retiro y nueva aplicación","Great Lengths GL Tapes: aproximadamente 4–6 semanas","El fabricante contempla reutilización de su sistema. Confirmar estado del cabello y consumibles antes de cada nueva aplicación."],["Weft cosida","Estado de la base, tensión y crecimiento","Donna Bella Hybrid Weft: mantenimiento cada 6–8 semanas","Evaluar por separado el cabello y la base de instalación."]],"note":"Son referencias de productos específicos, no un calendario universal ni una garantía Luxhair. La ficha del producto utilizado y la valoración profesional determinan el plan individual.","sections":[{"title":"No esperes a la fecha si hay molestias","paragraphs":["El dolor, ardor o tensión persistente no son señales que debas soportar para conservar un peinado. Las extensiones demasiado tensas pueden contribuir a la alopecia por tracción. Solicita una revisión; si aparecen zonas de pérdida de cabello o síntomas persistentes, consulta a un dermatólogo."]},{"title":"Alberca, mar y rutina diaria","paragraphs":["Informa a tu estilista si nadas con frecuencia. Great Lengths advierte que la exposición frecuente al mar, al agua clorada y a ambientes de vapor puede afectar sus sistemas. Esto no permite prometer que todas las extensiones duren una cantidad fija de semanas al nadar. Pide indicaciones específicas para tu producto."]}],"closing":"Antes de salir del salón: anota sistema y producto utilizados, fecha de colocación, próxima revisión y cuidados indicados. La duración se planifica; no se adivina."}];
const KNOWLEDGE_CONCEPTS = [["Tiempo de colocación","Lo que dura la cita para instalar el sistema."],["Periodo de uso por aplicación","El tiempo hasta que corresponde revisar, retirar o recolocar las extensiones. No equivale a la vida útil total del cabello."],["Vida útil del cabello reutilizable","El periodo durante el que el cabello puede volver a utilizarse, cuando su condición y el sistema lo permiten. Reutilizar el cabello no significa reutilizar automáticamente el adhesivo, el anillo o la unión."]];
const KNOWLEDGE_SOURCES = [["BELLAMI I-Tip","https://www.bellamihair.com/pages/learn-i-tip-hair-extensions"],["Donna Bella: métodos","https://donnabellahair.com/pages/shop"],["Great Lengths FAQ","https://www.greatlengths.com/en-gb/faq"],["Great Lengths: cuidados","https://www.greatlengths.com/faq"],["American Academy of Dermatology: tracción","https://www.aad.org/public/diseases/hair-loss/causes/hairstyles"]];

function KnowledgeSection() {
  return (
    <section id="knowledge" aria-labelledby="knowledge-title" className="w-full scroll-mt-24 border-y border-primary/10 bg-background py-16 md:py-24">
      <div className="mx-auto max-w-[100rem] px-4 md:px-8">
        <p className="mb-3 font-paragraph text-xs uppercase tracking-[0.22em] text-primary/60">Academia · LUX HAIR</p>
        <h2 id="knowledge-title" className="font-heading text-4xl text-primary md:text-5xl">Knowledge</h2>
        <p className="mt-4 max-w-2xl font-paragraph text-lg leading-relaxed text-primary/75">Conoce la fijación. Planifica el mantenimiento. Cuida tu cabello.</p>
        <nav aria-label="Guías de Knowledge" className="my-10 grid gap-5 md:grid-cols-2">
          {KNOWLEDGE_ARTICLES.map((article, index) => <a key={article.id} href={'#'+article.id} className="rounded-2xl border border-primary/15 bg-primary/[0.035] p-6 transition-colors hover:bg-primary/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
            <span className="text-xs uppercase tracking-widest text-primary/60">Guía 0{index+1}</span>
            <h3 className="mt-4 font-heading text-2xl text-primary">{article.title}</h3>
            <p className="mt-3 font-paragraph leading-relaxed text-primary/75">{article.summary}</p>
            <span className="mt-5 inline-block text-sm font-semibold text-primary">Leer guía →</span>
          </a>)}
        </nav>
        <div className="space-y-16">
          {KNOWLEDGE_ARTICLES.map((article, index) => <article key={article.id} id={article.id} className="scroll-mt-24 border-t border-primary/15 pt-10">
            <p className="text-xs uppercase tracking-widest text-primary/60">Knowledge · 0{index+1}</p>
            <h3 className="mt-3 max-w-4xl font-heading text-3xl leading-tight text-primary md:text-4xl">{article.title}</h3>
            {index === 1 && <div className="mt-8"><h4 className="mb-5 font-heading text-2xl text-primary">Tres tiempos que conviene separar</h4><div className="grid gap-4 md:grid-cols-3">{KNOWLEDGE_CONCEPTS.map(([title, body]) => <div key={title} className="rounded-xl border border-primary/15 bg-primary/[0.035] p-5"><h5 className="font-heading text-xl text-primary">{title}</h5><p className="mt-3 font-paragraph leading-relaxed text-primary/80">{body}</p></div>)}</div></div>}
            <p className="my-6 max-w-4xl font-paragraph leading-relaxed text-primary/80">{article.intro}</p>
            <p className="mb-3 text-sm text-primary/60 md:hidden">Desliza la tabla para comparar todos los detalles.</p>
            <div className="max-w-full overflow-x-auto rounded-xl border border-primary/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" tabIndex={0} role="region" aria-label={'Comparación: '+article.title}>
              <table className="w-full min-w-[760px] border-collapse text-left font-paragraph text-sm leading-relaxed text-primary/85">
                <caption className="sr-only">{article.title}</caption>
                <thead className="bg-primary/[0.07]"><tr>{article.headers.map(h => <th key={h} scope="col" className="border-b border-primary/15 px-5 py-4 font-semibold text-primary">{h}</th>)}</tr></thead>
                <tbody>{article.rows.map(row => <tr key={row[0]} className="border-b border-primary/10 last:border-0">{row.map((cell, cellIndex) => cellIndex === 0 ? <th key={cellIndex} scope="row" className="px-5 py-5 align-top font-semibold text-primary">{cell}</th> : <td key={cellIndex} className="px-5 py-5 align-top">{cell}</td>)}</tr>)}</tbody>
              </table>
            </div>
            <p className="mt-4 rounded-lg bg-primary/[0.04] p-4 font-paragraph text-sm leading-relaxed text-primary/80">{article.note}</p>
            <div className="mt-8 grid gap-8 lg:grid-cols-2">{article.sections.map(section => <section key={section.title}><h4 className="font-heading text-2xl text-primary">{section.title}</h4>{section.paragraphs.map(p => <p key={p} className="mt-4 font-paragraph leading-relaxed text-primary/80">{p}</p>)}</section>)}</div>
            <p className="mt-8 border-l-2 border-primary/40 pl-5 font-paragraph font-medium leading-relaxed text-primary">{article.closing}</p>
            <details className="mt-6 rounded-xl border border-primary/15 p-5"><summary className="cursor-pointer font-paragraph font-semibold text-primary">Fuentes y referencias educativas</summary><ul className="mt-4 space-y-3">{KNOWLEDGE_SOURCES.map(([label,url]) => <li key={url}><a href={url} target="_blank" rel="noopener noreferrer" className="break-words font-paragraph text-sm text-primary underline underline-offset-4">{label} ↗</a></li>)}</ul></details>
            <div className="mt-6 flex flex-wrap gap-5 text-sm text-primary"><a href={'#'+KNOWLEDGE_ARTICLES[index === 0 ? 1 : 0].id} className="underline underline-offset-4">{index === 0 ? 'Siguiente: duración y mantenimiento' : 'Ver métodos de colocación'}</a><a href="#knowledge" className="underline underline-offset-4">Volver a Knowledge ↑</a></div>
          </article>)}
        </div>
      </div>
    </section>
  );
}
