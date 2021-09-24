const app = new Vue({
    el: "#root",

    data: {
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [{
                    date: '20/03/2020 16:30:00',
                    message: 'Ciao come stai?',
                    status: 'sent'
                },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [{
                    date: '28/03/2020 10:10:40',
                    message: 'La Marianna va in campagna',
                    status: 'received'
                },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    message: 'Lo sai che ha aperto una nuova pizzeria?',
                    status: 'sent'
                },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
        ],
        
        selectedContact: 0,

        newMessage: '',

        lastAccess: '',

        userSearch: '',

        filteredUser: [],

        viewActions: false,

        clickedIndex: null
    },

    methods: {
        getAvatar: function(index) {
            return "img/avatar" + this.contacts[index].avatar + ".jpg";
        },

        getSelected: function(index) {
            this.selectedContact = index;
            this.clickedIndex = null;
            return this.selectedContact;
        },

        sendMessage: function() {
            let date = dayjs().format('DD/MM/YYYY HH:mm:ss');
            
            this.contacts[this.selectedContact].messages.push({
                date: date,
                message: this.newMessage,
                status: 'sent'
            })
            
            return this.newMessage = "";
        },
        
        sendReply: function() {
            setTimeout(() => {
                let date = dayjs().format('DD/MM/YYYY HH:mm:ss');
                
                this.contacts[this.selectedContact].messages.push({
                    date: date,
                    message: "Ok!",
                    status: 'received'
                });

                this.getLastAccess(this.contacts[this.selectedContact].messages);

            }, 1000);   
        },

        getLastAccess: function(arr) {
            arr.forEach(element => {
                if(element.status == 'received') {
                    this.lastAccess = element.date;
                }
            });

            return this.lastAccess;
        },

        contactSearch: function() {
            if(this.userSearch != '') {
                this.filteredUser = [];

                this.contacts.forEach((element, index) => {
                    let {name} = element;

                    if(name.toLowerCase().includes(this.userSearch.toLowerCase())) {
                        if(!this.filteredUser.includes(index)){
                            this.filteredUser.push(index);
                        };
                    }
                });
            } else if(this.userSearch == '') {
                this.filteredUser = [];
            }

            return this.filteredUser;
        },

        getClickedIndex: function(index) {
            if(this.clickedIndex == index) {
                this.clickedIndex = null;
            } else {
                this.clickedIndex = index;
            }

            return this.clickedIndex;

        },

        showActions: function() {
            if(this.viewActions == '') {
                this.viewActions = true;
            } else {
                this.viewActions = false;
            }
            return this.viewActions;
        },

        deleteMessage: function(index) {
            let messages = this.contacts[this.selectedContact].messages;

            messages.splice(index, 1);
        }

    },

    mounted: function() {
        this.getLastAccess(this.contacts[this.selectedContact].messages)
    }

})


// let day = date.getDate();
// let month = date.getMonth();
// let year = date.getFullYear();
// let hour = date.getHours();
// let minutes = date.getMinutes();
// let seconds = date.getSeconds();
// date: `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`,
// console.log(dayjs());

// let obj = {
//     date: '10/01/2020 15:50:00',
//     message: 'Si, ma preferirei andare al cinema',
//     status: 'received'
// }
// console.log(obj.date);

// console.log(dayjs(obj.date));

// let time = new Date();

// console.log(dayjs(time));

// console.log(time.toDateString());

// console.log(dayjs(obj.date).format('DD/MM/YYYY [alle] HH:mm:ss'));
