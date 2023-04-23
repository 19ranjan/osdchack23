export const arrContinent = [
    'JIIT',
    'UNACADEMY',
    'ALLEN',
    'PHYSICSWAALH',
    'JSS',
    'Ocenia'
]  

export const continentToIdx = (continent) => {
    return arrContinent.findIndex((cont) => cont.toLowerCase() === continent.toLowerCase())
}

export const idxToContinent = (idx) => {
    return (arrContinent.filter((_, index) => index === Number(idx)))[0]
}