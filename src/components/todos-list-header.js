/**
 * Created by Wilterson Garcia on 13/07/2017.
 */

import React from 'react';

export default class TodosListHeader extends React.Component{
    render(){
        const headerStyle = {
            textTransform: 'uppercase',
            textAlign: 'center',
            width: '50%'
        };

        return (
            <thead>
            <tr>
                <th style={headerStyle}>Tarefa</th>
                <th style={headerStyle}>Ações</th>
            </tr>
            </thead>
        );
    }
}