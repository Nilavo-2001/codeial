
class ChatEngine {
    constructor(userName, emailId) {

        this.userName = userName;
        this.emailId = emailId;
        this.socket = io.connect("http://54.164.119.170:5000");
        if (this.emailId) {
            this.connectionHandler();
        }
    }
    connectionHandler() {
        const self = this;
        // listener for automatically triggered event connect from server side
        self.socket.on("connect", () => {
            console.log("Connection established on client side...");
        })
        // emitting a join room event to be received by sever
        self.socket.emit("join_room", {
            user_email: self.emailId,
            chatroom: "codeial"
        });
        // listener for user joined event from server
        self.socket.on("user_joined", function (data) {
            console.log("User joined ", data);
        })
        $(`#send-message`).click(function () {
            console.log("send message clicked");
            const message = $('#chat-message-input').val();
            console.log(message);
            if (message) {
                // emitting an event to server
                self.socket.emit("message_send", {
                    message: message,
                    email: self.emailId,
                    chatroom: 'codeial',
                    userName: self.userName

                })
            }

        });
        // listener for message received event which can be triggered from message send by the same user or different user
        self.socket.on("message_received", function (data) {
            let myMessage = false;
            if (data.email == self.emailId) {
                // if the message is send by the same user
                myMessage = true;
            }
            let newMessage = `
            <li class=${(myMessage) ? "self-message" : "other-message"}>
             <span>
               ${data.message}
             </span>
             <span class="user-name">
              ${data.userName}
             </span>
            </li>`;
            $(`#chat-messages-list`).append(newMessage);
            $(`#chat-messages-list`).scrollTop($(`#chat-messages-list`).prop("scrollHeight"));

        })
    }

}