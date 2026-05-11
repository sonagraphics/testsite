window.albanianApp = {
    feedback: {
        correct: ["YAY! That's right! 🎉", "You got it!!", "Amazing job!", "You're a star ⭐", "Perfect! 🌟", "Shumë mirë! 🎊"],
        wrong: ["Oops! It's [ANS]", "Almost! We say: [ANS]", "Good try! The correct one is [ANS]", "Not quite! It's [ANS]"]
    },
    worlds: [
        { 
            id: 1, title: "Home Adventure", subtitle: "Greetings & Hellos", icon: "👋",
            lessons: [{ 
                id: "1-1", title: "Meeting People", 
                questions: [
                    { q: "How do you say 'Hello'?", options: ["Bukë", "Mollë", "Përshëndetje", "Jo"], a: "Përshëndetje" },
                    { q: "How do you say 'Goodbye'?", options: ["Natën", "Mirupafshim", "Po", "Tung"], a: "Mirupafshim" },
                    { q: "How do you say 'Thank you'?", options: ["Ju lutem", "Si je?", "Faleminderit", "Më fal"], a: "Faleminderit" },
                    { q: "How do you say 'Please'?", options: ["Më fal", "Ju lutem", "Jo", "Mirëdita"], a: "Ju lutem" },
                    { q: "How do you ask 'How are you?'", options: ["Ku je?", "Kush je?", "Si je?", "Çfarë bën?"], a: "Si je?" }
                ] 
            }] 
        },
        { 
            id: 2, title: "The Family Tree", subtitle: "My Family", icon: "🏠",
            lessons: [{ 
                id: "2-1", title: "My Relatives", 
                questions: [
                    { q: "What is 'Mother'?", options: ["Babai", "Nënë", "Vëllai", "Motra"], a: "Nënë" },
                    { q: "What is 'Father'?", options: ["Babai", "Gjyshi", "Motra", "Djali"], a: "Babai" },
                    { q: "What is 'Brother'?", options: ["Djali", "Vëllai", "Miku", "Babai"], a: "Vëllai" },
                    { q: "What is 'Sister'?", options: ["Vajza", "Nënë", "Motra", "Shoqe"], a: "Motra" },
                    { q: "What is 'Grandfather'?", options: ["Babai", "Gjyshi", "Vëllai", "Nipi"], a: "Gjyshi" },
                    { q: "What is 'Grandmother'?", options: ["Motra", "Gjyshja", "Mami", "Mbesa"], a: "Gjyshja" }
                ] 
            }]
        },
        { 
            id: 3, title: "Classroom Fun", subtitle: "School Supplies", icon: "🎒",
            lessons: [{ 
                id: "3-1", title: "School Supplies", 
                questions: [
                    { q: "What is 'Book'?", options: ["Laps", "Libër", "Gomë", "Bankë"], a: "Libër" },
                    { q: "What is 'Pencil'?", options: ["Libër", "Laps", "Fletore", "Makinë"], a: "Laps" },
                    { q: "What is 'Eraser'?", options: ["Laps", "Çantë", "Gomë", "Libër"], a: "Gomë" },
                    { q: "What is 'Backpack'?", options: ["Bankë", "Çantë", "Shkollë", "Gomë"], a: "Çantë" },
                    { q: "What is 'School'?", options: ["Shtëpi", "Shkollë", "Park", "Zyrë"], a: "Shkollë" }
                ] 
            }]
        },
        { 
            id: 4, title: "Tirana Café", subtitle: "Food & Drinks", icon: "🍎",
            lessons: [{ 
                id: "4-1", title: "The Market", 
                questions: [
                    { q: "What is 'Apple'?", options: ["Dardhë", "Mollë", "Ujë", "Portokall"], a: "Mollë" },
                    { q: "What is 'Bread'?", options: ["Bukë", "Djathë", "Vezë", "Mish"], a: "Bukë" },
                    { q: "What is 'Water'?", options: ["Qumësht", "Lëng", "Ujë", "Verë"], a: "Ujë" },
                    { q: "What is 'Milk'?", options: ["Ujë", "Qumësht", "Kafe", "Çaj"], a: "Qumësht" },
                    { q: "What is 'Egg'?", options: ["Mish", "Mollë", "Djathë", "Vezë"], a: "Vezë" }
                ] 
            }]
        },
        { 
            id: 5, title: "Animal Safari", subtitle: "Animal Friends", icon: "🦊",
            lessons: [{ 
                id: "5-1", title: "Animal Friends", 
                questions: [
                    { q: "What is 'Dog'?", options: ["Mace", "Qen", "Ujk", "Dhelpër"], a: "Qen" },
                    { q: "What is 'Cat'?", options: ["Mace", "Qen", "Lepur", "Miu"], a: "Mace" },
                    { q: "What is 'Horse'?", options: ["Lopa", "Kali", "Gomari", "Derr"], a: "Kali" },
                    { q: "What is 'Bird'?", options: ["Peshk", "Mace", "Zog", "Flutur"], a: "Zog" },
                    { q: "What is 'Fish'?", options: ["Zog", "Peshk", "Ujë", "Bretkosë"], a: "Peshk" }
                ] 
            }]
        },
        { 
            id: 6, title: "The Mirror", subtitle: "My Body", icon: "🤳",
            lessons: [{ 
                id: "6-1", title: "My Body", 
                questions: [
                    { q: "What is 'Head'?", options: ["Dorë", "Kokë", "Këmbë", "Qafë"], a: "Kokë" },
                    { q: "What is 'Eye'?", options: ["Vesh", "Sy", "Hundë", "Flokë"], a: "Sy" },
                    { q: "What is 'Ear'?", options: ["Gojë", "Sy", "Vesh", "Faqe"], a: "Vesh" },
                    { q: "What is 'Hand'?", options: ["Këmbë", "Krah", "Gisht", "Dorë"], a: "Dorë" },
                    { q: "What is 'Foot'?", options: ["Dorë", "Gju", "Këmbë", "Shpinë"], a: "Këmbë" }
                ] 
            }]
        },
        { 
            id: 7, title: "Rainbow Road", subtitle: "Colors", icon: "🎨",
            lessons: [{ 
                id: "7-1", title: "The Rainbow", 
                questions: [
                    { q: "What is 'Red'?", options: ["Kaltër", "Kuqe", "Zi", "Verdhë"], a: "Kuqe" },
                    { q: "What is 'Blue'?", options: ["Kuqe", "Kaltër", "Verdhë", "Gjelbër"], a: "Kaltër" },
                    { q: "What is 'Green'?", options: ["Bardhë", "Gjelbër", "Kaltër", "Rozë"], a: "Gjelbër" },
                    { q: "What is 'Yellow'?", options: ["Portokalli", "Kuqe", "Verdhë", "Kafte"], a: "Verdhë" },
                    { q: "What is 'White'?", options: ["Zi", "Bardhë", "Verdhë", "Hiri"], a: "Bardhë" }
                ] 
            }]
        },
        { 
            id: 8, title: "Market Day", subtitle: "Around Town", icon: "🏙️",
            lessons: [{ 
                id: "8-1", title: "In Town", 
                questions: [
                    { q: "How do you ask 'Where is the park?'", options: ["Ku është shtëpia?", "Ku është parku?", "Ku është rruga?", "Ku është lumi?"], a: "Ku është parku?" },
                    { q: "What is 'House'?", options: ["Dyqan", "Shtëpi", "Rrugë", "Qytet"], a: "Shtëpi" },
                    { q: "What is 'Car'?", options: ["Biçikletë", "Makinë", "Autobus", "Treni"], a: "Makinë" },
                    { q: "What is 'Store'?", options: ["Shkollë", "Spital", "Dyqan", "Kishë"], a: "Dyqan" },
                    { q: "What is 'Street'?", options: ["Lumë", "Rrugë", "Park", "Shesh"], a: "Rrugë" }
                ] 
            }]
        },
        { 
            id: 9, title: "Cloud Watcher", subtitle: "Weather", icon: "☁️",
            lessons: [{ 
                id: "9-1", title: "Nature's Moods", 
                questions: [
                    { q: "How do you say 'Today it is raining'?", options: ["Sot ka diell", "Sot bie shi", "Sot fryn erë", "Sot ka vranësira"], a: "Sot bie shi" },
                    { q: "How do you say 'The sun is shining'?", options: ["Po bie borë", "Dielli po ndriçon", "Qielli është i kaltër", "Hëna doli"], a: "Dielli po ndriçon" },
                    { q: "How do you say 'It is snowing'?", options: ["Fryn erë", "Po bie borë", "Bie shi", "Ka rrufe"], a: "Po bie borë" },
                    { q: "How do you say 'It is windy'?", options: ["Fryn erë", "Është nxehtë", "Është ftohtë", "Bie breshër"], a: "Fryn erë" },
                    { q: "What is 'Cloud'?", options: ["Qiell", "Hënë", "Yll", "Re"], a: "Re" }
                ] 
            }]
        },
        { 
            id: 10, title: "Celebration Time", subtitle: "Era Master", icon: "🌪️",
            lessons: [{ 
                id: "10-1", title: "Conversations", 
                questions: [
                    { q: "How do you say 'I speak Albanian'?", options: ["Unë ha bukë", "Unë jam mirë", "Unë flas shqip", "Unë shkoj në shkollë"], a: "Unë flas shqip" },
                    { q: "How do you ask 'What is your name?'", options: ["Si je?", "Si quhesh?", "Sa vjeç je?", "Ku banon?"], a: "Si quhesh?" },
                    { q: "How do you say 'I like learning'?", options: ["Nuk dua", "Më pëlqen të mësoj", "Po shkoj", "Jam i lumtur"], a: "Më pëlqen të mësoj" },
                    { q: "How do you say 'I am happy'?", options: ["Jam i mërzitur", "Jam i lodhur", "Jam i uritur", "Jam i lumtur"], a: "Jam i lumtur" },
                    { q: "How do you ask 'Where do you live?'", options: ["Ku shkon?", "Kush je?", "Ku banon?", "Çfarë ha?"], a: "Ku banon?" }
                ] 
            }]
        }
    ]
};
