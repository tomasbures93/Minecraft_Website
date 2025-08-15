const Datenschutz = () => (
    <div className='mt-3 p-3 card-default warning-card'>
        <h1>Datenschutzerklärung</h1>
        <div className="mt-4">
            <h2>1. Verantwortlicher</h2>
            Verantwortlich im Sinne der Datenschutz-Grundverordnung (DSGVO) ist: <br/>
            [Name] <br />
            [Adresse] <br />
            E-Mail: [Email]
        </div>
        <div className="mt-4">
        <h2>2. Erhebung und Speicherung personenbezogener Daten sowie Art und Zweck von deren Verwendung</h2>
            <ul>
                <li className="mt-2">
                    <h6>a) Beim Besuch der Website</h6>
                    Beim Aufrufen dieser Website werden durch den Hosting-Anbieter Hetzner Online GmbH, Industriestr. 25, 91710 Gunzenhausen, automatisch Informationen in sogenannten Server-Logfiles gespeichert. Diese umfassen:
                    <ul>
                        <li>IP-Adresse</li>
                    <li>Datum und Uhrzeit des Abrufs</li>
                    <li>Name und URL der abgerufenen Datei</li>
                    <li>Website, von der aus der Zugriff erfolgt (Referrer-URL)</li>
                    <li>Verwendeter Browser und ggf. Betriebssystem</li>
                    <li>Die Datenverarbeitung erfolgt zur Gewährleistung eines reibungslosen Verbindungsaufbaus, Systemsicherheit und zur Verbesserung des Angebots (Art. 6 Abs. 1 lit. f DSGVO). Die Logfiles werden in der Regel nach 14 Tagen gelöscht.</li>
                    </ul>
                </li>
                <li className="mt-2">
                    <h6>b) Google Fonts (CDN)</h6>
                    Diese Website verwendet Schriftarten von „Google Fonts“, bereitgestellt durch Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA.
                    Beim Aufruf der Seite werden Schriftarten von Google-Servern geladen. Hierbei kann Google personenbezogene Daten (z. B. IP-Adresse) erfassen. Die Datenverarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einheitlicher Darstellung). Weitere Informationen:
                    <a href="https://policies.google.com/privacy" target="_blank"> GOOGLE FONTS POLICIES</a>
                </li>
                <li className="mt-2">
                    <h6>c) Minecraft-Server-Statistiken</h6>
                    Diese Website zeigt öffentlich verfügbare Statistiken des Minecraft-Servers an. Dabei werden ggf. Minecraft-Spielernamen, Spielzeiten und Online-Status angezeigt. Diese Daten stammen aus den öffentlichen Serverabfragen (Query/Status API) und sind technisch notwendig, um die Informationen bereitzustellen.
                </li>
            </ul>
        </div>
        <div className="mt-4">
            <h2>3. Auftragsverarbeitung</h2>
            Mit unserem Hosting-Anbieter Hetzner Online GmbH besteht ein Vertrag zur Auftragsverarbeitung gemäß Art. 28 DSGVO.
        </div>
        <div className="mt-4">
            <h2>4. Rechte der betroffenen Personen</h2>
            Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen die Verarbeitung (Art. 15–21 DSGVO). Anfragen bitte an die oben genannte E-Mail-Adresse.
        </div>
        <div className="mt-4">
            <h2>5. SSL-/TLS-Verschlüsselung</h2>
            Diese Seite nutzt SSL-/TLS-Verschlüsselung zur sicheren Übertragung von Daten.
        </div>
        <div className="mt-4">
            <h2 className="mt-4">6. Änderungen</h2>
            Diese Datenschutzerklärung kann bei Bedarf angepasst werden, um gesetzlichen Anforderungen zu entsprechen oder Änderungen der Website-Funktionen zu berücksichtigen.
        </div>
    </div>
)

export default Datenschutz;