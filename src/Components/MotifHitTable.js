import React from 'react';
import { withRouter} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';



function createData([Motifhit,Protein, P_value, Sequence_1, Sequence_2]) {
    return {Motifhit,Protein, P_value, Sequence_1, Sequence_2};
  }

class MotifHitTable extends React.Component {
    state = {
        singleMotif:this.props.singleMotif
      }

    componentDidMount(){
        this.setState({
            singleMotif:this.props.singleMotif
    });}
    componentWillReceiveProps(nextProps){
        this.setState({
          singleMotif: nextProps.singleMotif
            //stringPicture: nextProps.topic.stringPicture
      });
      }
    render(){
        //const rows = [createData([1,2,3,4,5])]

        //For hit table
        var dict = this.state.singleMotif.motifHit === undefined
                ? {}
                : this.state.singleMotif.motifHit;
        var arr = [];
        for (var key in dict) {
                if (dict.hasOwnProperty(key)) {
                        arr.push(createData(dict[key].split("\t")));}}

                
        //structure the hit table
        const motifhitTable = this.state.singleMotif.motifHit === undefined
        ? (<CardContent> 
            <Typography>
              No Motif Hit
            </Typography>
          </CardContent>)
        : ( 
                    <Table size = 'small'>
                        <TableHead>
                            <TableRow>
                            <TableCell>Motifhit</TableCell>
                            <TableCell align="center">Protein</TableCell>
                            <TableCell align="center">P_value</TableCell>
                            <TableCell align="center">Sequence_1</TableCell>
                            <TableCell align="center">Sequence_2</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {arr.map(row => (
                            <TableRow key={row.Motifhit}>
                                <TableCell component="th" scope="row">
                                {row.Motifhit}
                                </TableCell>
                                <TableCell align="center">{row.Protein}</TableCell>
                                <TableCell align="center">{row.P_value}</TableCell>
                                <TableCell align="center">{row.Sequence_1}</TableCell>
                                <TableCell align="center">{row.Sequence_2}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>)
        return (
            <div>
                {motifhitTable}
            </div>
            
           
        )
    }
}

export default withRouter(MotifHitTable);