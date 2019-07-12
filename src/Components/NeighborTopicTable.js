import React from 'react';
import { withRouter} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';



function createData([ Topic, Summit_sig_log10P,Summit_position, Average_sig_log10P, Average_position]) {
    return {Topic, Summit_sig_log10P,Summit_position, Average_sig_log10P, Average_position};
  }

class NeighborTopicTable extends React.Component {
    state = {
        table:this.props.table
      }

    componentDidMount(){
        this.setState({
            table:this.props.table
    });}
    componentWillReceiveProps(nextProps){
        this.setState({
          table: nextProps.table
            //stringPicture: nextProps.topic.stringPicture
      });
      }
    render(){
        //const rows = [createData([1,2,3,4,5])]

        //For hit table
        const topicList = this.state.table[0].topicList.split('\t')
        var arr = [];
        for (var j in topicList) 
        {
            for (var i in this.state.table[0]){
                if(topicList[j]== i){
                    arr.push(createData(this.state.table[0][i].split("\t")))
                }
            }
        }

                
        //structure the hit table
        const neighborTopicTable = (<Table size = 'small'>
                        <TableHead>
                            <TableRow>
                            <TableCell>Topic</TableCell>
                            <TableCell align="center">Summit_sig_log10P</TableCell>
                            <TableCell align="center">Summit_position</TableCell>
                            <TableCell align="center">Average_sig_log10P</TableCell>
                            <TableCell align="center">Average_position</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {arr.map(row => (
                            <TableRow key={row.Topic}>
                                <TableCell component="th" scope="row">
                                {row.Topic}
                                </TableCell>
                                <TableCell align="center">{row.Summit_sig_log10P}</TableCell>
                                <TableCell align="center">{row.Summit_position}</TableCell>
                                <TableCell align="center">{row.Average_sig_log10P}</TableCell>
                                <TableCell align="center">{row.Average_position}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>)
        return (
            <div>
                {neighborTopicTable}
            </div>
            
           
        )
    }
}

export default withRouter(NeighborTopicTable);