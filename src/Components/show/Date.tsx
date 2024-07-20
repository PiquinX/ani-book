export const Date = ({ date }: { date: string }) => {
    const dateSplit = date.split(' ')

    if (dateSplit.length < 4){
        return <>{dateSplit[0]}</>
    }
    return (
        <div>
            {dateSplit[2] + ' ' + dateSplit[1] + ' ' + dateSplit[3]}
        </div>
    )
}