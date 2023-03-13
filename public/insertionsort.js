// Sorting function
            function insertionSort(arr){ 
                //parsing
                arr.sort(function(a, b) {
                let aNumber = a.replace( /^\D+/g, '');
                 let bNumber = b.replace( /^\D+/g, '');
               if (aNumber.length * bNumber.length) {
                     a = parseInt(aNumber);
                     b = parseInt(bNumber);
               } else if (aNumber.length + bNumber.length) {
                return aNumber.length ? -1 : 1;
                  }
                  return ((a === b) ? 0 : ((a > b) ? 1 : -1));
                      });

                for (let i = 1; i < arr.length; i++){ 
                    let growthElement = arr[i]; 
                    // Compare growthElement with the sorted sequence 
                    let j = i - 1; 
                    
                    // Move elements larger than growthElement one position ahead 
                    while (j >= 0 && arr[j] > growthElement){ 
                        arr[j+1] = arr[j]; 
                        
                        j = j - 1; 
                    } 
                    
                    arr[j+1] = growthElement; 
                 } 
                 
                 return arr; 
        } 
            

        