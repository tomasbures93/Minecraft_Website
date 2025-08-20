import { useEffect } from "react";

const Impressum = () => {

    useEffect(() => {
        window.scrollTo(0,0);
    }, []);

    return (
    <div className='mt-3 p-3 card-default warning-card'>
        <h1 className='border-under'>Impressum</h1>
        Angaben gemäß § 5 TMG

        <h2 className="mt-4">Name:</h2>
        [Name]

        <h2 className="mt-4">Anschrift:</h2>
        [Deine ladungsfähige Adresse hier eintragen]

        <h2 className="mt-4">Kontakt:</h2>
        E-Mail: [Email]
        <div className="mt-4">
            <strong>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</strong> <br />
            [Name]<br />
            [Adresse wiederholen]
        </div>
        
        <h2 className="mt-4">Haftungsausschluss:</h2>
        Die bereitgestellten Inhalte auf dieser Website dienen ausschließlich Informationszwecken rund um den Minecraft-Server. Für die Inhalte externer Links wird keine Haftung übernommen. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
    </div>
)
}

export default Impressum;