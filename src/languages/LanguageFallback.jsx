import * as React from 'react'
import English from './en.json'
import Spanish from './es.json'
import Telugu from './te.json'
import { IntlProvider, FormattedMessage } from 'react-intl'

//Establishes supported languages and retrieves languages from browser
const supportedLocales = ['en', 'es', 'te']
const navigatorLanguages = navigator.languages

//Filters languages in the case unsupported languages are present
const filteredLanguages = navigatorLanguages.filter(language => supportedLocales.indexOf(language) !== -1)

//Retreives translations from JSON files
const getTranslations = (locale) => {
    let lang
    if(locale === 'es'){
        lang = Spanish
    } else if(locale === 'te'){
        lang = Telugu
    } else {
        lang = English
    }
    return lang
}

//Checks if translations are present in each JSON file based on the id of formatted message and returns first found translation
const checkTranslations = (id) => {
    const firstLocale = getTranslations(filteredLanguages[0])
    const secondLocale = getTranslations(filteredLanguages[1])

    if(firstLocale[id]){
        return [filteredLanguages[0]]
    } else if (secondLocale[id]){
        return [filteredLanguages[1]]
    } else {
        return [filteredLanguages[2]]
    }
}

export default function getTranslatedMessage (id) {
    const[locale] = checkTranslations(id)
    return (
        <IntlProvider locale={locale} messages={getTranslations(locale)}>
            <FormattedMessage id={id} />
        </IntlProvider>
    )
}

