import React from 'react';
import { withRouter} from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function createData([Topics,Significance_log10P, Common_genes_num,Common_genes_percent_wrt_topics, wrt_reference_topics]) {
    return {Topics,Significance_log10P, Common_genes_num,Common_genes_percent_wrt_topics, wrt_reference_topics};
  }

class TopicSubsectorTable extends React.Component {
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
        var arr = [];
        for (var i in this.state.table) {arr.push(createData(this.state.table[i].split("\t")));}

                
        //structure the hit table
        const topicSubsectorTable = (<Table size = 'small'>
                        <TableHead>
                            <TableRow>
                            <TableCell>Topics</TableCell>
                            <TableCell align="center">Significance_log10P</TableCell>
                            <TableCell align="center">Common_genes_num</TableCell>
                            <TableCell align="center">Common_genes_percent_wrt_topics</TableCell>
                            <TableCell align="center">wrt_reference_topics</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {arr.map(row => (
                            <TableRow key={row.Topics}>
                                <TableCell component="th" scope="row">
                                {row.Topics}
                                </TableCell>
                                <TableCell align="center">{row.Significance_log10P}</TableCell>
                                <TableCell align="center">{row.Common_genes_num}</TableCell>
                                <TableCell align="center">{row.Common_genes_percent_wrt_topics}</TableCell>
                                <TableCell align="center">{row.wrt_reference_topics}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>)
        return (
            <div>
                {topicSubsectorTable}
            </div>
            
           
        )
    }
}

export default withRouter(TopicSubsectorTable);