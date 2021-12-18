## Analyse en architectuur
# Samenvatting(bare minimum)

Er word door onze klant gevraagd om een platform te ontwikkelen waarbij gebruikers verschillende afbeeldingen kunnen uploaden en deze worden omgezet naar een GIF (Graphics Interchange Format) bestand. Dit bestand wordt getoond en kan ook door de gebruiker worden opgeslagen op zijn eigen computer (downloaden).  Gebruikers kunnen het GIF bestand nog altijd opvragen via een URL dat 1 dag geldig is, hierna kan het GIF bestand niet meer opgevraagd worden.

# Technische aspecten(bare minimum)

Om dit platform te realiseren zullen we gebruik maken van een API om zowel de bestanden te uploaden als deze om te vormen tot een GIF. Na het omvormen van de afbeeldingen tot een GIF zal dit bestand tijdelijk worden opgeslagen in een databank. De originele afbeeldingen opslaan lijkt een overbodige functie.
Nadat de geldigheidsperiode van 1 dag is verstreken worden alle gerelateerde bestanden (bestanden die dus ouder zijn dan 1 dag) verwijdert worden.
Om er voor te zorgen dat enkel geauthentiseerde gebruikers toegang hebben tot het maken van GIF bestanden zal er ook een login voorzien worden.



# Architectuur

![ddddd!](images/ICT-archi-flow-diagram.png)

Er zijn 4 handelingen die worden uitgevoerd vanuit de postman client naar de AWS cloud.

## 1. Register
Als er wordt geregistreerd sturen we deze gegevens naar de Amazon EC2 API die vervolgens de nieuwe gebruiker gaat registreren via Cognito. Wij confirmen dan deze gebruiker zijn emailadres. 

## 2. Login
Na dat de registratie succesvol is kunnen we ook inloggen met de Amazon EC2 API. Cognito maakt een JSON Web Token (JWT) aan en koppelt deze aan de gebruiker.

## 3. Upload
Om dit proces te kunnen starten moet je ingelogd zijn. Eerst wordt de JWT gevalideerd met de EC2 API en Cognito. Vervolgens uploaden we de afbeeldingen naar de S3 bucket en triggeren we een AWS lambda functie,
deze lambda functie gaat de afbeeldingen in kwestie ophalen in de bucket en er een gif van genereren. Na dat de gif is gegenereerd zal de metadata (naam, sub,..) ervan ook worden opgeslagen in de MySQL database (RDS).

## 4. Get gifs
Als default wanneer je ingelogd bent gaan we de gebruiker zijn/haar gemaakte gifs ophalen om te displayen. Dit gebeurt ook weer op dezelfde manier via EC2 API en Cognito waar de JWT wordt gevalideerd. Hierna halen we de gif bestanden op aan de hand van de gebruiker zijn sub in de S3 bucket.

## AWS Cloud
De cloud zelf heeft ook 1 lambda functie die wordt uitgevoerd elke 12 uur. De functie gaat in de RDS database de metadata checken of er gifs zijn die ouder zijn dan 24 uur. Als dit het geval is gaat de lambda deze gifs deleten uit de S3 bucket.

# Verantwoording keuzes
**EC2**: Elastic Compute Cloud zal gebruikt worden voor de virtuele server. Deze service van Amazon heeft als voordeel dat de gebruikte middelen zeer snel kunnen worden aangepast. Hierdoor zal er altijd genoeg opslag en rekenkracht zijn maar nooit te veel. Ook een beschikbaarheidsgraad van 99.99% is een troef om het platform altijd online te houden.

**Cognito**: Om de identiteit van gebruikers te confirmeren zullen we gebruik maken van Amazon Cognito. Deze service zorgt voor een simpele implementatie van authenticatie d.m.v. veel gebruikte sociale media platformen zoals Google of Meta.  

**RDS**: Amazon RDS wordt gebruikt om onze relationele databank te beheren. Deze service heeft een zeer lage kost die zich aanpast aan gebruikte opslag. Deze opslag wordt ook automatisch opgeschaald. Het is veilig vanwege de mogelijkheid om het binnen onze eigen virtuele server te draaien en dus enkel hierbinnen deze kunnen bereiken.

**S3**: Een S3 (Simple Storage Service) bucket zal gebruikt worden om de GIF bestanden te uploaden naar de database
