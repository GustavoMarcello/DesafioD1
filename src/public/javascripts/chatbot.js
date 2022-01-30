!(function () {
    let e = document.createElement("script"),
      t = document.head || document.getElementsByTagName("head")[0];
    (e.src =
      "https://cdn.jsdelivr.net/npm/rasa-webchat@1.0.1/lib/index.js"),//maybe https://cdn.jsdelivr.net/npm/rasa-webchat@1.0.0/lib/index.js
      (e.async = !0),
      (e.onload = () => {
        window.WebChat.default(
          {
            customData: { language: "pt" },
            // socketUrl: "https://bf-botfront.development.agents.botfront.cloud",
            initPayload: "/greet",
            socketUrl: "http://localhost:5005/",
            socketPath: "/socket.io/",
            customData: {useId: "123"},
            title: "MooVIE Search",
            subtitle: "Chatbot",
            inputTextFieldHint: "Digite uma mensagem...",
            showFullScreenButton: true,
            params:{"storage": "session"}
          },
          null
        );
      }),
      t.insertBefore(e, t.firstChild);
  })();