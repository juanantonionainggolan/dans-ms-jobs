import axios from "axios";

export const getJobs = async (req, res) => {
    const query = req.query;
    const { description, city, full_time } = query
    let paramArray = [];
    if (description && description !== '')  {
        paramArray.push(`description=${description}`)
    };
    if (city && city !== '')  {
        paramArray.push(`city=${city}`)
    };
    if (full_time === 'true')  {
        paramArray.push(`full_time=${full_time}`)
    };
    let queryString = (paramArray.length === 0) ? '' : '?'
    queryString = queryString + paramArray.join('&');

    const options = {
        'method': 'get',
        'url': `http://dev3.dansmultipro.co.id/api/recruitment/positions.json${queryString}`,
        'headers': {
          'Content-Type': 'application/json'
        }
      };
      console.log(options)
    
      try {
        const result = await axios(options);
        // console.log(result.data);
         return await res.send(result.data);
      } catch (e) {
           console.log(e);
      }
      
}

