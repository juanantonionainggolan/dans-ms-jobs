import axios from "axios";

export const getJobs = async (req, res) => {
    const options = {
        'method': 'get',
        'url': 'http://dev3.dansmultipro.co.id/api/recruitment/positions.json',
        'headers': {
          'Content-Type': 'application/json'
        }
      };
    
      try {
        const result = await axios(options);
        console.log(result.data);
         return await res.send(result.data);
      } catch (e) {
           console.log(e);
      }
      
}

