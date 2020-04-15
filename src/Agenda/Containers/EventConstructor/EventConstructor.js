import React, {useState, useEffect} from 'react'
import classes from './EventConstructor.module.css'

export default function EventConstructor(props) {
const [newClassForm, setNewClassForm] = useState(
    {
        classType: {
            elementType: 'radio',
            title: 'Select The Class Type',
            radioLabels: [
                {value: 'Open Session'},
                {value: 'Private'}
            ],
            value: ''
        },
        classTitle: {
            elementType: 'radio',
            title: 'Select a Class Modality',
            radioLabels: [
                {value: 'Hatha Yoga'},
                {value: 'Yoga Terapia'},
                {value: 'Yoga Nidra'},
                {value: 'Yoga Mindfulness'},
                {value: "Mantra Yoga"}
            ],
            value: ''
        },
        location: {
            elementType: 'radio',
            title: 'Select the Class Location',
            radioLabels: [
                {value: 'Lisbon - PT'}
            ],
            value: ''
        },
        duration: {
            elementType: 'radio',
            title: 'Select the Class Duration',
            radioLabels: [
                {value: '40min'},
                {value: '60min'},
                {value: '90min'}
            ],
            value: ''
        },
        classCapacity: {
            elementType: 'input',
            title: 'Select the Class Capacity',
            elementConfig: {
                type: 'text',
                placeholder: 'How Many Students?'
            },
            value: ''
        },
        classDate: {
            elementType: 'date',
            classFrequencyOptions: 'tba',
            classFrequencySubMenu: {
                initialMenu: {
                    title: 'Is this a weekly basis class?',
                    weeklyFrequency: 'Yes',
                    singleFrequency: 'No',
                },
                weeklyOptions: {
                    title: 'Pick a Starting Date',
                    frequencySubTitle: 'What other days of the week will the class repeat?'
                },
                singleOptions: {
                    title: 'Pick the Class Date'
                }
            },
            selectedDayArray: [],
            classFrequency: [
                {day: 'Sun', dayOfWeek: 0, toggleClassColor: 'inherit'},
                {day: 'Mon', dayOfWeek: 1, toggleClassColor: 'inherit'},
                {day: 'Tue', dayOfWeek: 2, toggleClassColor: 'inherit'},
                {day: 'Wed', dayOfWeek: 3, toggleClassColor: 'inherit'},
                {day: 'Thu', dayOfWeek: 4, toggleClassColor: 'inherit'},
                {day: 'Fri', dayOfWeek: 5, toggleClassColor: 'inherit'},
                {day: 'Sat', dayOfWeek: 6, toggleClassColor: 'inherit'},
            ],
            value: ''
        },
        //I am not using the value... The two way binding comes from the <Clock/> Component
        classTime: {
            elementType: 'time',
            title: 'Pick the Class Time',
            value: ''
        }
    })



}