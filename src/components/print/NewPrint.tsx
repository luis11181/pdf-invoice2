import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import FormHelperText from "@mui/material/FormHelperText";
import { useCallback, useEffect, useRef, useState } from "react";

import ReactToPrint from "react-to-print";
import { Icomprobante } from "../../firebase";
import LoadingButton from "@mui/lab/LoadingButton";

import classes from "./Print.module.css";

interface Iprops {
  print: Icomprobante[];
}
const NewPrint: React.FC<Iprops> = (props): JSX.Element => {
  // let location: any = useLocation();
  // //si hubo una ruta anterio la pone en la variable, en caso contrario lleva a la pronmcipal
  // let from = location.state?.from?.pathname || "/";

  const componentRef = useRef(null);

  return (
    <Box>
      <Box
        ref={componentRef}
        className={`${classes.pageContainer} ${classes["no-break-inside"]}`}

        //center all the text fileds indie the div
      >
        {props.print.map((comprobante, indexComprobante) => {
          return (
            <div key={comprobante.numero}>
              <Box
                key={comprobante.numero}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                //noValidate
                //autoComplete="off"
              >
                <Grid
                  key={comprobante.numero}
                  container //grid contenedor que define prorpiedades de la grilla
                  //spacing={1}
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 2 }}
                >
                  <Grid item xs={6} md={6}>
                    <TextField
                      defaultValue={comprobante.numero}
                      InputProps={{
                        readOnly: true,
                      }}
                      id="numero"
                      variant="filled"
                      //required // le pone un asterisco para saber  que es obligatoria
                      label="numero"
                      type="text"
                    />
                  </Grid>

                  {comprobante.lista.map((item, index) => {
                    return (
                      <Grid item xs={12} key={index}>
                        <Box
                          key={index}
                          //sx={{ border: 1, backgroundColor: "primary.light" }}
                        >
                          <Grid
                            container //grid contenedor que define prorpiedades de la grilla
                            //spacing={1}
                            key={index}
                            rowSpacing={1}
                            columnSpacing={{ xs: 1, sm: 2, md: 2 }}
                          >
                            <Grid item xs={4} md={4} key={index}>
                              <TextField
                                defaultValue={item.codigoPuc}
                                InputProps={{
                                  readOnly: true,
                                }}
                                id={`codigoPuc${index}`}
                                //required // le pone un asterisco para saber  que es obligatoria
                                label={`codigoPuc${index}`}
                                type="text"
                                variant="filled"
                              />
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <TextField
                                defaultValue={item.concepto}
                                InputProps={{
                                  readOnly: true,
                                }}
                                id={`concepto${index}`}
                                //required // le pone un asterisco para saber  que es obligatoria
                                label={`concepto${index}`}
                                type="text"
                                variant="filled"
                              />
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <TextField
                                defaultValue={item.valor}
                                InputProps={{
                                  readOnly: true,
                                }}
                                id={`valor${index}`}
                                //required // le pone un asterisco para saber  que es obligatoria
                                label={`valor${index}`}
                                type="number"
                                variant="filled"
                              />
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                    );
                  })}

                  <Grid item xs={12} md={12}>
                    <TextField
                      fullWidth
                      defaultValue={comprobante.observaciones}
                      InputProps={{
                        readOnly: true,
                      }}
                      id="observaciones"
                      //required // le pone un asterisco para saber  que es obligatoria
                      label="observaciones"
                      type="text"
                      variant="filled"
                    />
                  </Grid>

                  <Grid item xs={3} md={3}>
                    <TextField
                      fullWidth
                      defaultValue={comprobante.formaPago}
                      InputProps={{
                        readOnly: true,
                      }}
                      id="formaPago"
                      //required // le pone un asterisco para saber  que es obligatoria
                      label="forma Pago"
                      type="text"
                      variant="filled"
                    />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <TextField
                      fullWidth
                      defaultValue={comprobante.banco}
                      InputProps={{
                        readOnly: true,
                      }}
                      id="banco"
                      //required // le pone un asterisco para saber  que es obligatoria
                      label="banco"
                      type="text"
                      variant="filled"
                    />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <TextField
                      fullWidth
                      defaultValue={
                        comprobante.fechaAplica
                          .toDate()
                          .toISOString()
                          .split("T")[0]
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                      id="fechaAplica"
                      //required // le pone un asterisco para saber  que es obligatoria
                      label="fechaAplica"
                      type="date"
                      variant="filled"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <TextField
                      fullWidth
                      defaultValue={comprobante.chequeNumero}
                      InputProps={{
                        readOnly: true,
                      }}
                      id="chequeNumero"
                      //required // le pone un asterisco para saber  que es obligatoria
                      label="cheque Numero"
                      type="text"
                      variant="filled"
                    />
                  </Grid>
                </Grid>

                <Box sx={{ m: 1 }} />
              </Box>
              <Box sx={{ m: 1 }} />
            </div>
          );
        })}
      </Box>
      <Box sx={{ m: 3 }} />
      <Box
        sx={{
          //center content inside
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ReactToPrint
          trigger={() => (
            <Button
              color="secondary"
              variant="contained"
              type="button"
              onClick={() => {}}
            >
              Generar pdf de la seleccion!{" "}
            </Button>
          )}
          content={() => componentRef.current}
        />
      </Box>
    </Box>
  );
};

export default NewPrint;
