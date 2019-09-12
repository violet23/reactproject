import React from "react";
import axios from "axios";
import { withRouter} from 'react-router-dom';
import MUIDataTable from "mui-datatables";
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Config from '../Config';

class Searchtable extends React.Component {
    handleRowClick = (rowData, rowMeta) => {
        //redirect to Topic page
        //window.location.assign(Config.settings.appURL + '/'+ rowData[0]);
        this.props.history.push('/'+ rowData[0]);
    }
    state = {        
        data : [],
        loading : true,
        message: "Fetching Samples"
    }
    componentDidMount(){
        var dataURL = Config.settings.apiURL+Config.settings.topicsEndpoint;
        axios.get(dataURL)
        .then(res =>{
            console.log(res.data.topics);
            //retrieve the protein data
            let values = res.data.topics.map(topic=>{
                console.log([topic.topicID, (topic.proteinList.split('\t')).length])
                return [topic.topicID, (topic.proteinList.split('\t')).length]
            });
            this.setState({
                data : values,
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
        const columns = [
            {
            name : "Topic Name",
            options: {
                filter: false,
                sort: true,
                
            }
        },
        {
            name : "Number of Proteins",
            options: {
                filter: false,
                sort: true,
                
            }
        },
    ];
        const {data, loading, message}= this.state;
        const options = {
            //filterType: "multiselect",
            responsive: "scroll",
            selectableRows: false,
            rowsPerPage: 7,
            viewColumns : false,
            filter: false,
            //rowsPerPageOptions:[50,10,15,20,50,100],
            onRowClick: this.handleRowClick,
            print:false,
            downloadOptions:{filename: 'topicData.csv', separator: ','} 
          };
        const topicsTable = loading ? (  
            <Typography component="div" >                   
                <Typography component="p" variant="subtitle1" >
                    {message}
                </Typography>
                <LinearProgress variant="query" />
            </Typography> 
            
            ) : (
                <MUIDataTable
                    title={"Explore"}
                    data={data}
                    columns={columns}
                    options={options}        
                />
            );

        return (
            <div style={{maxWidth: 1140, margin: 'auto'}}>
             {topicsTable}
            </div>
           
        )
    }
}
export default withRouter(Searchtable);