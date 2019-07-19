import React from "react";
import axios from "axios";
import { withRouter} from 'react-router-dom';
import MUIDataTable from "mui-datatables";
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Config from '../Config';

class TopicStatisticsTable extends React.Component {
    
    handleRowClick = (rowData, rowMeta) => {
        //redirect to Topic page
        //window.location.assign(Config.settings.appURL + '/protein/'+ rowData[0]);
        this.props.history.push('/protein/'+ rowData[0]);
    }
    state = {        
        data : [],
        loading : true,
        message: "Fetching Samples"
        
    }
    componentDidMount(){
        const topic =(window.location.pathname);
        var dataURL = Config.settings.apiURL+Config.settings.topicsEndpoint+topic;
        axios.get(dataURL)
        .then(res =>{
            //retrieve the protein data
            let values = res.data.topic.map(topic=>{
                var dict = res.data.topic[0]["topicStatisticsTable"][0];
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
        downloadOptions:{filename: "Topic"+(window.location.pathname)+'_ProteinTable.csv', separator: ','} 
      };

      const columns = ["proteins", 
      "z-score", 
      "protein peak tags in this topic", 
      "total protein peak tags",
      "fraction of peak tags in this topic"];
      
      const {data, loading, message}= this.state;
      
      const topicSTable = loading ? (  
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
        {topicSTable}
       </div>
  )
}
}
export default withRouter(TopicStatisticsTable);
