// A mock function to mimic making an async request for data
export function createUser(userData) {
    return new Promise(async(resolve) =>{
      const response = await fetch("http://localhost:5000/users",{
        method:"POST",
        body:JSON.stringify(userData),
        headers:{'content-type':'application/json'}
      })
      const data = await response.json()
      resolve({data})
    }
    );
  }
  
  
  export function checkUser(loginInfo) {
    return new Promise(async (resolve,reject) =>{
      const response = await fetch(`http://localhost:5000/users/login`,{
        method:"POST",
        body:JSON.stringify(loginInfo),
        headers:{'content-type':'application/json'}

    })
      const data = await response.json()
      console.log({data})
      if(data){
        resolve({data})
        }
        else{
          reject({message:"Wrong Credentials"})
        }
      }
    );
  }