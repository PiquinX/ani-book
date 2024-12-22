export const Date = ({ date }: { date: string }) => {
    const dateSplit = date.split(' ')

    if (dateSplit.length < 4){
        return <span className='font-semibold'>{dateSplit[0]}</span>
    }
    return (
        <span className='font-semibold'>
            {dateSplit[2] + ' ' + dateSplit[1] + ' ' + dateSplit[3]}
        </span>
    )
}