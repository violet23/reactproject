import React from "react";
import axios from "axios";
import { withRouter} from 'react-router-dom';
import MUIDataTable from "mui-datatables";
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Config from '../Config';

class ProteinStatisticsTable extends React.Component {
    
    handleRowClick = (rowData, rowMeta) => {
        //redirect to Topic page
        this.props.history.push('/'+ rowData[0]);
    }
    state = {        
        data : [],
        loading : true,
        message: "Fetching Samples"
        
    }
    componentDidMount(){
        const protein = (window.location.pathname).split("/")[2];
        const dataURL = Config.settings.apiURL +Config.settings.proteinsEndpoint +"/" + protein;
        axios.get(dataURL)
        .then(res =>{
            //retrieve the protein data
            let values = res.data.protein.map(protein=>{
                var dict = res.data.protein[0]["proteinStatisticsTable"][0];
                var arr = [];
                for (var key in dict) {
                    if (dict.hasOwnProperty(key)) {
                        var temp = []
                        for(var i=0; i<dict[key].split("\t").length; i++){
                            temp.push(dict[key].split("\t")[i]);
                        }
                        arr.push(temp)
                    }
                }
                console.log(arr)
                return arr
            });
            this.setState({
                data : values[0],
                loading: false
            });
        }).catch(error =>{
            console.log(error);
            this.setState({
                loading: true,
                message: error.message + "/ Server Offline"
            })
        });
      }

    render(){
    
       const options = {
        //filterType: "multiselect",
        responsive: "scroll",
        selectableRows: false,
        rowsPerPage: 10,
        viewColumns : false,
        filter: false,
        rowsPerPageOptions:[50,10,15,20,50,100],
        onRowClick: this.handleRowClick,
        print:false,
        downloadOptions:{filename: "Protein"+(window.location.pathname).split("/")[2]+'_TopicTable.csv', separator: ','} 
      };

      const columns = ["topics", 
      "z-score", 
      "protein peak tags in this topic", 
      "total protein peak tags",
      "fraction of peak tags in this topic"];
      
      const {data, loading, message}= this.state;
      
      const proteinSTable = loading ? (  
        <Typography component="div" >                   
            <Typography component="p" variant="subtitle1" >
                {message}
            </Typography>
            <LinearProgress variant="query" />
        </Typography> 
        
        ) : (
            <MUIDataTable
                data={data}
                columns={columns}
                options={options}        
            />
        );

      return (   
        <div style={{maxWidth: 1140, margin: 'auto'}}>
        {proteinSTable}
       </div>
  )
}
}
export default withRouter(ProteinStatisticsTable);
