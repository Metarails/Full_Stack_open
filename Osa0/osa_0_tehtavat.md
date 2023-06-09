0.4 uusi muistiinpano

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note left of browser: käyttäjä påanaa submit nappia
    browser->>server: POST komennolla formin tiedot servulle
    activate server
    Note right of browser: req.body.note
    note right of server: päivtys notes tietoihin
    server-->>browser: Response 302 että asia tehty
    Note left of server: headerissa redirect url
    deactivate server
    browser->>server: GET komennolla redirect url
    activate server
    server-->>browser: HTML document jossa päivitetty tieto
    deactivate server
    note left of browser: aiempi esimerrki uudelleen
    browser->>server: ...

    
```

0.5 Single Page App

```mermaid
sequenceDiagram
    participant browser
    participant server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: 200, HTML document
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server
    
    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server    

    Note right of browser: selain luo html elementtiin tietojen mukaisen tiedon
 ```

0.6 Single Page App

```mermaid
sequenceDiagram
    participant browser
    participant funktio
    participant server

    browser ->> funktio: painetaan submit ja kutsutaan funktiota
    funktio ->> server: funktio lähettää html formissa olevat sevulle
    Note right of server: päivitettään noten tiedot
    server ->> funktio: palautetaan tieto päivityksestä
    funktio ->> browser: funktio päivittää selaimessa olevan tiedon


    
```