import { StatusBar } from 'expo-status-bar';
import { Image, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import TrashSVG from './assets/trash.svg'
import AddSVG from './assets/add.svg'
import PencilSVG from './assets/pencil.svg'
import SearchSVG from './assets/search.svg'

import { useEffect, useState } from 'react';

type ContactData = {
    name: string;
    number: string;
    photo: string;
}
const savedContacts: ContactData[] = [
    { name: "Abraão Sena", number: "(11) 90876-1234", photo: require('./assets/contacts/Avatar1.png') },
    { name: "Beatriz Clasen", number: "(48) 90876-1123", photo: require('./assets/contacts/Avatar2.png') },
    { name: "Brenda Mendes", number: "(21) 90876-8765", photo: require('./assets/contacts/Avatar3.png') },
    { name: "Caio Vinícius", number: "(71) 90876-2435", photo: require('./assets/contacts/Avatar4.png') },
    { name: "Cleiton Souza", number: "(11) 90876-1209", photo: require('./assets/contacts/Avatar5.png') },
    { name: "Daniel Duarte", number: "(82) 90876-6534", photo: require('./assets/contacts/Avatar6.png') },
]

type Categories = {
    [key: string]: ContactData[]
}

export default function App() {
    const [contacts, setContacts] = useState<Categories>({})

    function orderContacts() {
        const map: Categories = {}

        for(const contact of savedContacts) {
            const firstLetter = contact.name.charAt(0).toUpperCase()

            if(map[firstLetter]) {
                map[firstLetter].push(contact)
            } else {
                map[firstLetter] = [contact]
            }
        }

        setContacts(map)
    }

    useEffect(() => {
        orderContacts()
    }, [savedContacts])

    const randomBGColors = [
        'bg-blue-600',
        'bg-purple-500',
        'bg-green-600',
        'bg-red-700',
        'bg-yellow-600',
        'bg-orange-500'
    ]

    return (
        <>
            <StatusBar style='light'/>
            <View className='bg-[#16151E] flex flex-1 h-screen pt-5'>
                <View className='flex flex-row justify-between items-center p-5'>
                    <View>
                        <Text className='text-zinc-200 text-xl font-bold'>Meus Contatos</Text>
                    </View>
                    <View className='flex flex-row space-x-3'>  
                        <AddSVG height={25} width={25} />
                        <PencilSVG height={30} width={30} />
                        <TrashSVG height={24} width={24} />
                    </View>
                </View>
                <View className='p-4'>
                    
                    <View className='bg-[#24243D] flex flex-row justify-center items-center rounded-lg space-x-2 p-3'>
                        <SearchSVG height={16} width={16} />
                        <TextInput 
                            className='bg-[#24243D] rounded text-zinc-200'
                            placeholder={'Busque por nome ou por dados de contato...'}
                            placeholderTextColor='#E1E1E6'
                        />                    
                    </View>
                    <View className='space-y-10 mt-10'>
                        {Object.keys(contacts).map(letter => {
                            const randomColorIdx = Math.floor(Math.random() * randomBGColors.length)

                            return (    
                                <View key={letter} className='justify-start items-start flex flex-row space-x-7'>
                                    <View className={randomBGColors[randomColorIdx]+' rounded-lg flex px-4 py-2'}>
                                        <Text className='text-white text-center text-xl'>{letter}</Text>
                                    </View>

                                    <View className='flex flex-col space-y-7'>
                                        {contacts[letter].map(contact => {
                                            
                                            return (
                                                <View key={contact.number} className='flex flex-row items-center'>

                                                    <Image 
                                                        className='rounded-full mr-3'
                                                        source={contact.photo}
                                                        // style={{ width: 32, height: 32 }}
                                                    />
                                                    <View className='flex flex-col'>
                                                        <Text className='font-bold text-md text-zinc-100'>{contact.name}</Text>
                                                        <Text className='text-sm text-zinc-600'>{contact.number}</Text>
                                                    </View>
                                                </View>
                                            )
                                        })}
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </View>
            </View>
        </>
    );
}

