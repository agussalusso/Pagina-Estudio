let Arch = document.getElementById("Archivo");
let Instruccion = document.getElementById("F");
let Boton = document.getElementById("Listo");
let Resultado = document.getElementById("Resultado2");
let Opcion = document.getElementById("Opcion");
let promp, completa;
let completo="Analiza el archivo completo y genera un resumen detallado, preciso y bien estructurado del contenido. Explica todos los temas importantes de manera clara y completa, manteniendo las palabras técnicas y conceptos relevantes cuando sean necesarios. Incluye ejemplos simples y claros para facilitar la comprensión de conceptos complejos. No omitas información importante, definiciones, procesos, fórmulas, conclusiones o datos relevantes. Si el archivo contiene pasos, procedimientos o procesos, descríbelos en orden lógico. Si existen fechas, nombres, estadísticas, leyes, conceptos técnicos o términos específicos, inclúyelos en el resumen. Resume sin perder contexto ni significado y evita repetir información innecesariamente. Usa únicamente texto plano, sin emojis, asteriscos, viñetas decorativas ni símbolos innecesarios. Organiza el contenido con un título principal, subtítulos claros, párrafos separados, sangrías y una estructura visual limpia. Mantén una redacción profesional, natural y fácil de leer. El resumen debe sentirse como un documento explicativo completo y no como una lista corta de puntos. El objetivo es crear un resumen profundo, entendible y completo que permita comprender el contenido del archivo incluso sin haber leído el documento original.No uses comillas ni asteriscos para hacer el resumen, solo texto limpio."
let facil= "Analiza el archivo completo y explica absolutamente todo el contenido de una manera clara, fácil de entender, detallada y bien desarrollada. El objetivo es que cualquier persona, incluso sin conocimientos previos sobre el tema, pueda comprender completamente la información leyendo únicamente esta explicación. Explica cada tema paso a paso, desarrollando las ideas importantes en profundidad y evitando respuestas cortas, superficiales o demasiado resumidas. Utiliza un lenguaje simple y natural, pero conserva las palabras técnicas necesarias y acompáñalas siempre con explicaciones sencillas y ejemplos claros. Cada concepto complejo debe desglosarse en partes más fáciles de comprender. Describe definiciones, procesos, procedimientos, fórmulas, teorías, conceptos técnicos, datos importantes, fechas, nombres, estadísticas y conclusiones cuando aparezcan en el archivo. Si el contenido incluye procesos o instrucciones, explícalos en orden lógico y detallado indicando para qué sirve cada paso y cómo funciona. Si existen relaciones entre conceptos, compáralos y explica cómo se conectan entre sí. Cuando sea posible, utiliza ejemplos prácticos, situaciones reales o comparaciones simples para facilitar el entendimiento. No omitas información importante del archivo. Si un tema parece complejo, amplía la explicación hasta que sea fácil de entender. Evita asumir que el lector ya conoce el tema. Mantén coherencia entre los párrafos y conserva el contexto general del documento durante toda la explicación. El formato debe estar perfectamente organizado utilizando únicamente texto plano, sin emojis, sin asteriscos, sin listas decorativas y sin símbolos innecesarios. Incluye un título principal relacionado con el contenido del archivo, subtítulos claros para separar los temas, párrafos bien desarrollados, sangrías y una estructura visual limpia y profesional. Cada sección debe conectarse naturalmente con la siguiente para que la lectura sea fluida. La explicación final debe sentirse como una guía educativa completa, extensa y fácil de seguir, similar a un capítulo de estudio o material de aprendizaje bien redactado, y no como un simple resumen corto";
let clave ="Analiza el texto completo y extrae únicamente las palabras clave, conceptos importantes, términos técnicos, nombres relevantes, fechas, fórmulas, procesos, ideas principales y cualquier elemento esencial necesario para comprender el contenido general del documento. Selecciona solamente la información más importante y representativa, evitando palabras irrelevantes o demasiado genéricas. Cada palabra clave o concepto debe estar acompañado por una breve aclaración o contexto básico que ayude a entender rápidamente su significado o función dentro del texto, sin convertirlo en una explicación extensa. Organiza la información de forma clara, ordenada y fácil de leer utilizando texto plano, con buena separación entre elementos, sangrías y estructura visual limpia. No uses emojis, asteriscos, símbolos decorativos ni explicaciones largas. El resultado debe funcionar como una guía rápida de conceptos esenciales para estudiar, repasar o comprender el contenido principal del texto de manera eficiente";
let añadido= document.getElementById("addpromp")
let modoOsc=false;
let modoNormal=true;

function Oscuro() {
    modoOsc = true;
    modoNormal=false;
    if (modoOsc==true)
        {
            document.body.classList.remove("normal")
            document.body.classList.add("dark")

        }
    }
function Normal() {
    modoOsc = false;
    modoNormal=true;
    if (modoNormal==true)
        {
            document.body.classList.remove("dark")
            document.body.classList.add("normal")
        }
    }


































Boton.addEventListener("click", function() {
    let opcion = Instruccion.value;
    if (opcion == "completo") {
        promp = completo;
    } else if (opcion == "facil") {
        promp= facil;
    } else if (opcion == "clave") {
        promp = clave + añadido;
    }

    let Archivo = Arch.files[0];
    let lector = new FileReader();

    if (Opcion.value == "PDF") {
        lector.readAsArrayBuffer(Archivo);
        lector.onload = function() {
            let pdf = pdfjsLib.getDocument(lector.result);
            pdf.promise.then(function(doc) {
                doc.getPage(1).then(function(page) {
                    page.getTextContent().then(function(contenido) {
                        let texto = contenido.items.map(i => i.str).join(" ");
                        completa = promp + " " + texto;
                        fetch("https://api.groq.com/openai/v1/chat/completions", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Bearer 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"
                            },
                            body: JSON.stringify({
                                model: "llama-3.3-70b-versatile",
                                messages: [{ role: "user", content: completa }]
                            })
                        })
                        .then(response => response.json())
                        .then(data => {
                            Resultado.innerText = data.choices[0].message.content;
                        });
                    });
                });
            });
        };
    } else if (Opcion.value == "TXT") {
        lector.readAsText(Archivo);
        lector.onload = function() {
            completa = promp + " " + lector.result;
            fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer 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"
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: [{ role: "user", content: completa }]
                })
            })
            .then(response => response.json())
            .then(data => {
                Resultado.innerText = data.choices[0].message.content;
            });
        };
    }
});