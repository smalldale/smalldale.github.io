var fileInput = document.getElementById("csv"),
    readFile = function () {
        var reader = new FileReader();
        reader.onload = function () {
            var raw_data = [];
            var error = [];

            // document.getElementById('out').innerHTML = reader.result;
            raw_data = reader.result.split("\r\n");
            
            for (var i in raw_data.slice(2, raw_data.length)) {
                // console.log(raw_data[i].includes("Your request cannot be processed at this time, please try again later."));
                if (raw_data[i].includes("Your")) {
                    error.push(raw_data[i].split(",")[1].slice(1));
                    // console.log(raw_data[i]);
                }
            };
            if (error.length > 0) {
                document.getElementById("length_error").innerHTML = '<div class="alert alert-danger" role="alert">Ditemukan '+error.length+' kode error.</div>';
                document.getElementById("box_result").style.visibility = 'visible';
                document.getElementById("result").innerHTML = error.join('<br>')
            } else {
                document.getElementById("length_error").innerHTML = '<div class="alert alert-success" role="alert">Semua kode sukses. Kode error tidak ditemukan.</div>';
                document.getElementById("box_result").style.visibility = 'hidden';
            }
        };
        // start reading the file. When it is done, calls the onload event defined above.
        reader.readAsBinaryString(fileInput.files[0]);
    };

fileInput.addEventListener('change', readFile);
