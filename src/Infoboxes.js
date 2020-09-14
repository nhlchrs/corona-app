import React from 'react'
import './Infoboxes.css'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {preetyNumber} from './utils'
function Infoboxes({title, cases,active,isRed , total, ...props}) {
    return (
            <Card onClick={props.onClick} className={`infoboxes ${active && "infobox-selected"} ${isRed && "infobox--red"}`} >
                <CardContent>
                    <Typography className="infobox_title" color="textSecondary">
                        {title}
                    </Typography>
                    <h2 className={`infobox_cases" ${!isRed && "info-green"}`}> {preetyNumber(cases)}</h2>
                    <Typography className="infobox_total" color="textSecondary">
                        {total}
                    </Typography>
                </CardContent>
            </Card>
    )
}

export default Infoboxes
