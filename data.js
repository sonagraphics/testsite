const albanianApp = {
    streaks: {
        1: { label: "Spark", icon: "🕯️" },
        3: { label: "Campfire", icon: "🔥" },
        7: { label: "Dragon Breath", icon: "🐲" },
        30: { label: "Era Legend", icon: "🌪️" }
    },
    feedback: {
        correct: ["YAY! That’s right! 🎉", "You got it!!", "Amazing job!", "You’re a star ⭐", "Perfect! 🌟"],
        wrong: ["Oops! It’s [ANS]", "Almost! We say: [ANS]", "Good try! The correct one is [ANS]", "Not quite! It's [ANS]"]
    },
    worlds: [
        { 
            id: 1, title: "Home Adventure", subtitle: "Greetings", character: "Luli the Stork", icon: "👋",
            lessons: [{ 
                id: "1-1", title: "Meeting People", 
                questions: [
                    { q: "How do you say 'Hello'?", options: ["Përshëndetje", "Bukë", "Mollë", "Jo"], a: "Përshëndetje" },
                    { q: "How do you say 'Goodbye'?", options: ["Mirupafshim", "Natën", "Po", "Tung"], a: "Mirupafshim" },
                    { q: "How do you say 'Thank you'?", options: ["Faleminderit", "Ju lutem", "Si je?", "Më fal"], a: "Faleminderit" },
                    { q: "How do you say 'Please'?", options: ["Ju lutem", "Më fal", "Jo", "Mirëdita"], a: "Ju lutem" },
                    { q: "How do you ask 'How are you?'", options: ["Si je?", "Ku je?", "Kush je?", "Çfarë bën?"], a: "Si je?" }
                ] 
            }] 
        },
        { 
            id: 2, title: "The Family Tree", subtitle: "My Family", character: "Bora the Bunny", icon: "🏠",
            lessons: [{ 
                id: "2-1", title: "My Relatives", 
                questions: [
                    { q: "What is 'Mother'?", options: ["Nënë", "Babai", "Vëllai", "Motra"], a: "Nënë" },
                    { q: "What is 'Father'?", options: ["Babai", "Gjyshi", "Motra", "Djali"], a: "Babai" },
                    { q: "What is 'Brother'?", options: ["Vëllai", "Djali", "Miku", "Babai"], a: "Vëllai" },
                    { q: "What is 'Sister'?", options: ["Motra", "Vajza", "Nënë", "Shoqe"], a: "Motra" },
                    { q: "What is 'Grandfather'?", options: ["Gjyshi", "Babai", "Vëllai", "Nipi"], a: "Gjyshi" },
                    { q: "What is 'Grandmother'?", options: ["Gjyshja", "Motra", "Mami", "Mbesa"], a: "Gjyshja" }
                ] 
            }]
        },
        { 
            id: 3, title: "Classroom Fun", subtitle: "School", character: "Shqiponja", icon: "🎒",
            lessons: [{ 
                id: "3-1", title: "School Supplies", 
                questions: [
                    { q: "What is 'Book'?", options: ["Libër", "Laps", "Gomë", "Bankë"], a: "Libër" },
                    { q: "What is 'Pencil'?", options: ["Laps", "Libër", "Fletore", "Makinë"], a: "Laps" },
                    { q: "What is 'Eraser'?", options: ["Gomë", "Laps", "Çantë", "Libër"], a: "Gomë" },
                    { q: "What is 'Backpack'?", options: ["Çantë", "Bankë", "Shkollë", "Gomë"], a: "Çantë" },
                    { q: "What is 'School'?", options: ["Shkollë", "Shtëpi", "Park", "Zyrë"], a: "Shkollë" }
                ] 
            }]
        },
        { 
            id: 4, title: "Tirana Café", subtitle: "Food", character: "Berti the Bear", icon: "🍎",
            lessons: [{ 
                id: "4-1", title: "The Market", 
                questions: [
                    { q: "What is 'Apple'?", options: ["Mollë", "Dardhë", "Ujë", "Portokall"], a: "Mollë" },
                    { q: "What is 'Bread'?", options: ["Bukë", "Djathë", "Vezë", "Mish"], a: "Bukë" },
                    { q: "What is 'Water'?", options: ["Ujë", "Qumësht", "Lëng", "Verë"], a: "Ujë" },
                    { q: "What is 'Milk'?", options: ["Qumësht", "Ujë", "Kafe", "Çaj"], a: "Qumësht" },
                    { q: "What is 'Egg'?", options: ["Vezë", "Mish", "Mollë", "Djathë"], a: "Vezë" }
                ] 
            }]
        },
        { 
            id: 5, title: "Animal Safari", subtitle: "Animals", character: "Dhelpra", icon: "🦊",
            lessons: [{ 
                id: "5-1", title: "Animal Friends", 
                questions: [
                    { q: "What is 'Dog'?", options: ["Qen", "Mace", "Ujk", "Dhelpër"], a: "Qen" },
                    { q: "What is 'Cat'?", options: ["Mace", "Qen", "Lepur", "Miu"], a: "Mace" },
                    { q: "What is 'Horse'?", options: ["Kali", "Lopa", "Gomari", "Derr"], a: "Kali" },
                    { q: "What is 'Bird'?", options: ["Zog", "Peshk", "Mace", "Flutur"], a: "Zog" },
                    { q: "What is 'Fish'?", options: ["Peshk", "Zog", "Ujë", "Bretkosë"], a: "Peshk" }
                ] 
            }]
        },
        { 
            id: 6, title: "The Mirror", subtitle: "Body", character: "Dreri", icon: "🤳",
            lessons: [{ 
                id: "6-1", title: "My Body", 
                questions: [
                    { q: "What is 'Head'?", options: ["Kokë", "Dorë", "Këmbë", "Qafë"], a: "Kokë" },
                    { q: "What is 'Eye'?", options: ["Sy", "Vesh", "Hundë", "Flokë"], a: "Sy" },
                    { q: "What is 'Ear'?", options: ["Vesh", "Gojë", "Sy", "Faqe"], a: "Vesh" },
                    { q: "What is 'Hand'?", options: ["Dorë", "Këmbë", "Krah", "Gisht"], a: "Dorë" },
                    { q: "What is 'Foot'?", options: ["Këmbë", "Dorë", "Gju", "Shpinë"], a: "Këmbë" }
                ] 
            }]
        },
        { 
            id: 7, title: "Rainbow Road", subtitle: "Colors", character: "Flutura", icon: "🎨",
            lessons: [{ 
                id: "7-1", title: "The Rainbow", 
                questions: [
                    { q: "What is 'Red'?", options: ["Kuqe", "Kaltër", "Zi", "Verdhë"], a: "Kuqe" },
                    { q: "What is 'Blue'?", options: ["Kaltër", "Kuqe", "Verdhë", "Gjelbër"], a: "Kaltër" },
                    { q: "What is 'Green'?", options: ["Gjelbër", "Bardhë", "Kaltër", "Rozë"], a: "Gjelbër" },
                    { q: "What is 'Yellow'?", options: ["Verdhë", "Portokalli", "Kuqe", "Kafte"], a: "Verdhë" },
                    { q: "What is 'White'?", options: ["Bardhë", "Zi", "Verdhë", "Hiri"], a: "Bardhë" }
                ] 
            }]
        },
        { 
            id: 8, title: "Market Day", subtitle: "The City", character: "Gjirafa", icon: "🏙️",
            lessons: [{ 
                id: "8-1", title: "In Town", 
                questions: [
                    { q: "Where is the park?", options: ["Ku është parku?", "Ku është shtëpia?", "Ku është rruga?", "Ku është lumi?"], a: "Ku është parku?" },
                    { q: "What is 'House'?", options: ["Shtëpi", "Dyqan", "Rrugë", "Qytet"], a: "Shtëpi" },
                    { q: "What is 'Car'?", options: ["Makinë", "Biçikletë", "Autobus", "Treni"], a: "Makinë" },
                    { q: "What is 'Store'?", options: ["Dyqan", "Shkollë", "Spital", "Kishë"], a: "Dyqan" },
                    { q: "What is 'Street'?", options: ["Rrugë", "Lumë", "Park", "Shesh"], a: "Rrugë" }
                ] 
            }]
        },
        { 
            id: 9, title: "Cloud Watcher", subtitle: "Weather", character: "Hëna", icon: "☁️",
            lessons: [{ 
                id: "9-1", title: "Nature's Moods", 
                questions: [
                    { q: "Today it is raining:", options: ["Sot bie shi", "Sot ka diell", "Sot fryn erë", "Sot ka vranësira"], a: "Sot bie shi" },
                    { q: "The sun is shining:", options: ["Dielli po ndriçon", "Po bie borë", "Qielli është i kaltër", "Hëna doli"], a: "Dielli po ndriçon" },
                    { q: "It is snowing:", options: ["Po bie borë", "Fryn erë", "Bie shi", "Ka rrufe"], a: "Po bie borë" },
                    { q: "It is windy:", options: ["Fryn erë", "Është nxehtë", "Është ftohtë", "Bie breshër"], a: "Fryn erë" },
                    { q: "What is 'Cloud'?", options: ["Re", "Qiell", "Hënë", "Yll"], a: "Re" }
                ] 
            }]
        },
        { 
            id: 10, title: "Celebration Time", subtitle: "Era Master", character: "Era Spirit", icon: "🌪️",
            lessons: [{ 
                id: "10-1", title: "Conversations", 
                questions: [
                    { q: "I speak Albanian:", options: ["Unë flas shqip", "Unë ha bukë", "Unë jam mirë", "Unë shkoj në shkollë"], a: "Unë flas shqip" },
                    { q: "What is your name?", options: ["Si quhesh?", "Si je?", "Sa vjeç je?", "Ku banon?"], a: "Si quhesh?" },
                    { q: "I like learning:", options: ["Më pëlqen të mësoj", "Nuk dua", "Po shkoj", "Jam i lumtur"], a: "Më pëlqen të mësoj" },
                    { q: "I am happy:", options: ["Jam i lumtur", "Jam i mërzitur", "Jam i lodhur", "Jam i uritur"], a: "Jam i lumtur" },
                    { q: "Where do you live?", options: ["Ku banon?", "Ku shkon?", "Kush je?", "Çfarë ha?"], a: "Ku banon?" }
                ] 
            }]
        }
    ]
};
