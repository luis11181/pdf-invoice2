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
import { useEffect, useRef, useState } from "react";
import { selectCorreo } from "../app/mainStateSlice";
import { useAppSelector } from "../app/hooks";
import ReactToPrint from "react-to-print";
import { useNavigate } from "react-router-dom";
import newInvoice from "../features/invoice/newInvoice";
import LoadingButton from "@mui/lab/LoadingButton";
import { Timestamp } from "firebase/firestore";
import { useParams } from "react-router-dom";
import readInvoice from "../features/invoice/readInvoice";
import { Icomprobante } from "../firebase";

interface IValues {
  error: null | string;
}

type FormValues = {
  tipoComprobante: "egreso" | "ingresos" | "gastos";
  numero: string;
  observaciones: string;
  formaPago: string;
  banco: string;
  fechaAplica: Date;
  chequeNumero: string;
  codigoPuc: string;
  concepto: string;
  valor: number;
  lista: {
    codigoPuc: string;
    concepto: string;
    valor: number;
  }[];
};

type Iparams = {
  tipoComprobante: "egreso" | "ingresos" | "gastos";
  numero: string;
  year: string;
};

const InvoiceDetail: React.FC = (): JSX.Element => {
  let { numero, tipoComprobante, year } = useParams<Iparams>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [values, setValues] = useState<IValues>({
    error: null,
  });
  const [loading, setLoading] = useState(false);

  const [datos, setDatos] = useState<Icomprobante>({} as Icomprobante);

  const correoUsuarioActual = useAppSelector(selectCorreo);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const datos = await readInvoice(numero!, tipoComprobante!, year!);
      setDatos(datos);
    })();
  }, [numero, tipoComprobante, year]);

  console.log(datos);

  //  const onSubmit: SubmitHandler<FormValues> = async (data, e) => {
  //e es el objeto evento normal
  //     //console.log(data);
  //     setLoading(true);

  //     //alert(JSON.stringify(resultado));

  //     let dataFechaAplica = new Date(data.fechaAplica);

  //     dataFechaAplica.setHours(0, 0, 0, 0);

  //     let dataFechaCreacion = new Date();

  //     dataFechaCreacion.setHours(0, 0, 0, 0);

  //     let year = dataFechaAplica.getFullYear().toString();
  //     let tipoComprobante = data.tipoComprobante;
  //     let numero = data.numero.trim();
  //     let observaciones = data.observaciones;
  //     let formaPago = data.formaPago;
  //     let banco = data.banco;
  //     let chequeNumero = data.chequeNumero;
  //     let fechaAplica = Timestamp.fromDate(dataFechaAplica);
  //     let fechaModificacion = null;
  //     let fechaCreacion = Timestamp.fromDate(dataFechaCreacion);
  //     let usuarioCreacion = correoUsuarioActual ? correoUsuarioActual : "error";
  //     let usuarioModificacion = "";

  //     let lista = [
  //       {
  //         codigoPuc: data.codigoPuc,
  //         concepto: data.concepto,
  //         valor: data.valor,
  //       },
  //       ...data.lista,
  //     ];

  //     try {
  //       await newInvoice(
  //         year,
  //         tipoComprobante,
  //         numero,
  //         observaciones,
  //         formaPago,
  //         banco,
  //         chequeNumero,
  //         usuarioCreacion,
  //         usuarioModificacion,
  //         fechaAplica,
  //         fechaCreacion,
  //         fechaModificacion,
  //         lista
  //       );

  //       navigate(`/detalle/${numero}`);
  //     } catch (error: any) {
  //       setLoading(false);
  //       if (error.message && typeof error.message === "string") {
  //         setValues({ ...values, error: error.message });
  //       } else {
  //         setValues({ ...values, error: "Error inesperado" });
  //       }
  //     }
  //   };

  return (
    //   <Box
    //   //center all the text fileds indie the div
    //   >
    //     <Typography
    //       variant="h1"
    //       component="h1"
    //       align="center"
    //       fontSize={30}
    //       fontWeight="bold"
    //       gutterBottom
    //     >
    //       Detalle Comprobante
    //     </Typography>

    //     <Box
    //       sx={{
    //         display: "flex",
    //         flexDirection: "column",
    //         justifyContent: "center",
    //         alignItems: "center",
    //       }}
    //       //noValidate
    //       //autoComplete="off"
    //     >
    //       <Grid
    //         container //grid contenedor que define prorpiedades de la grilla
    //         //spacing={1}
    //         rowSpacing={1}
    //         columnSpacing={{ xs: 1, sm: 2, md: 2 }}
    //       >
    //         <Grid item xs={6} md={6} textAlign={"center"}>
    //           <TextField
    //             id="tipoComprobante"
    //             //required // le pone un asterisco para saber  que es obligatoria
    //             label="tipo Comprobante"
    //             type="text"
    //             InputProps={{
    //               readOnly: true,
    //             }}
    //           >
    //             {" "}
    //             {datos.tipoComprobante}{" "}
    //           </TextField>
    //         </Grid>
    //         <Grid item xs={6} md={6}>
    //           <TextField
    //             id="numero"
    //             //required // le pone un asterisco para saber  que es obligatoria
    //             label="numero"
    //             type="text"
    //             InputProps={{
    //               readOnly: true,
    //             }}
    //           >
    //             {" "}
    //             data{" "}
    //           </TextField>
    //         </Grid>
    //         <Grid item xs={12}>
    //           <Box //sx={{ border: 1, borderColor: "primary.main" }}
    //           >
    //             <Grid
    //               container //grid contenedor que define prorpiedades de la grilla
    //               //spacing={1}
    //               rowSpacing={1}
    //               columnSpacing={{ xs: 1, sm: 2, md: 2 }}
    //             >
    //               <Grid item xs={6} md={3}>
    //                 <TextField
    //                   id="codigoPuc"
    //                   //required // le pone un asterisco para saber  que es obligatoria
    //                   label="codigoPuc"
    //                   type="text"
    //                   variant="outlined"
    //                   error={errors.codigoPuc ? true : false}
    //                   helperText={errors.codigoPuc && true}
    //                   //variant="outlined"
    //                   //defaultValue="Hello World"
    //                   {...register("codigoPuc")}
    //                 />
    //               </Grid>
    //               <Grid item xs={6} md={3}>
    //                 <TextField
    //                   id="concepto"
    //                   //required // le pone un asterisco para saber  que es obligatoria
    //                   label="concepto"
    //                   type="text"
    //                   variant="outlined"
    //                   error={errors.concepto ? true : false}
    //                   helperText={errors.concepto && true}
    //                   //variant="outlined"
    //                   //defaultValue="Hello World"
    //                   {...register("concepto", {
    //                     required: { value: true, message: "requerido" },
    //                     // maxLength: { value: 15, message: "nombre muy largo" },
    //                   })}
    //                 />
    //               </Grid>
    //               <Grid item xs={6} md={3}>
    //                 <TextField
    //                   id="valor"
    //                   //required // le pone un asterisco para saber  que es obligatoria
    //                   label="valor"
    //                   type="number"
    //                   variant="outlined"
    //                   error={errors.valor ? true : false}
    //                   helperText={errors.valor && true}
    //                   //variant="outlined"
    //                   //defaultValue="Hello World"
    //                   {...register("valor", {
    //                     required: { value: true, message: "requerido" },
    //                     // maxLength: { value: 15, message: "nombre muy largo" },
    //                   })}
    //                 />
    //               </Grid>
    //             </Grid>
    //           </Box>
    //         </Grid>
    //         {fields.map((item: any, index: number) => {
    //           return (
    //             <Grid item xs={12} key={item.id}>
    //               <Box
    //                 key={item.id}
    //                 //sx={{ border: 1, backgroundColor: "primary.light" }}
    //               >
    //                 <Grid
    //                   container //grid contenedor que define prorpiedades de la grilla
    //                   //spacing={1}
    //                   key={item.id}
    //                   rowSpacing={1}
    //                   columnSpacing={{ xs: 1, sm: 2, md: 2 }}
    //                 >
    //                   <Grid item xs={6} md={3} key={item.id}>
    //                     <TextField
    //                       id={`codigoPuc${index}`}
    //                       //required // le pone un asterisco para saber  que es obligatoria
    //                       label={`codigoPuc${index}`}
    //                       type="text"
    //                       variant="outlined"
    //                       error={errors?.lista?.[index]?.codigoPuc ? true : false}
    //                       helperText={
    //                         errors?.lista?.[index]?.codigoPuc &&
    //                         errors?.lista?.[index]?.codigoPuc?.message
    //                       }
    //                       //variant="outlined"
    //                       //defaultValue="Hello World"

    //                       {...register(`lista.${index}.codigoPuc` as const, {
    //                         required: { value: true, message: "requerido" },
    //                         // maxLength: { value: 15, message: "nombre muy largo" },
    //                       })}
    //                     />
    //                   </Grid>
    //                   <Grid item xs={6} md={3}>
    //                     <TextField
    //                       id={`concepto${index}`}
    //                       //required // le pone un asterisco para saber  que es obligatoria
    //                       label={`concepto${index}`}
    //                       type="text"
    //                       variant="outlined"
    //                       error={errors?.lista?.[index]?.concepto ? true : false}
    //                       helperText={
    //                         errors?.lista?.[index]?.concepto &&
    //                         errors?.lista?.[index]?.concepto?.message
    //                       }
    //                       //variant="outlined"
    //                       //defaultValue="Hello World"
    //                       {...register(`lista.${index}.concepto` as const, {
    //                         required: { value: true, message: "requerido" },
    //                         // maxLength: { value: 15, message: "nombre muy largo" },
    //                       })}
    //                     />
    //                   </Grid>
    //                   <Grid item xs={6} md={3}>
    //                     <TextField
    //                       id={`valor${index}`}
    //                       //required // le pone un asterisco para saber  que es obligatoria
    //                       label={`valor${index}`}
    //                       type="number"
    //                       variant="outlined"
    //                       error={errors?.lista?.[index]?.valor ? true : false}
    //                       helperText={
    //                         errors?.lista?.[index]?.valor &&
    //                         errors?.lista?.[index]?.valor?.message
    //                       }
    //                       //variant="outlined"
    //                       //defaultValue="Hello World"
    //                       {...register(`lista.${index}.valor` as const, {
    //                         required: { value: true, message: "requerido" },
    //                         // maxLength: { value: 15, message: "nombre muy largo" },
    //                       })}
    //                     />
    //                   </Grid>
    //                   <Grid item xs={6} md={3}>
    //                     <IconButton
    //                       aria-label="delete"
    //                       type="button"
    //                       color="secondary"
    //                       size="large"
    //                       onClick={() => remove(index)}
    //                     >
    //                       <DeleteIcon fontSize="inherit" />
    //                     </IconButton>
    //                   </Grid>
    //                 </Grid>
    //               </Box>
    //             </Grid>
    //           );
    //         })}

    //         <Grid
    //           item
    //           xs={12}
    //           sx={{
    //             display: "flex",
    //             flexDirection: "column",
    //             //justifyContent: "right",
    //             alignItems: "end",
    //           }}
    //         >
    //           <Button
    //             sx={{
    //               display: "flex",
    //               flexDirection: "column",
    //               justifyContent: "center",
    //               alignItems: "center",
    //             }}
    //             type="button"
    //             variant="contained"
    //             onClick={() =>
    //               append({
    //                 codigoPuc: "",
    //                 concepto: "",
    //                 valor: undefined,
    //               })
    //             }
    //           >
    //             Agregar
    //           </Button>
    //         </Grid>

    //         <Grid item xs={6} md={3}>
    //           <TextField
    //             fullWidth
    //             id="observaciones"
    //             //required // le pone un asterisco para saber  que es obligatoria
    //             label="observaciones"
    //             type="text"
    //             variant="outlined"
    //             error={errors.observaciones ? true : false}
    //             helperText={errors.observaciones && errors.observaciones.message}
    //             //variant="outlined"
    //             //defaultValue="Hello World"
    //             {...register("observaciones", {
    //               required: { value: true, message: "requerido" },
    //               // maxLength: { value: 15, message: "nombre muy largo" },
    //             })}
    //           />
    //         </Grid>

    //         <Grid item xs={6} md={3}>
    //           <TextField
    //             id="formaPago"
    //             //required // le pone un asterisco para saber  que es obligatoria
    //             label="forma Pago"
    //             type="text"
    //             variant="outlined"
    //             error={errors.formaPago ? true : false}
    //             helperText={errors.formaPago && errors.formaPago.message}
    //             //variant="outlined"
    //             //defaultValue="Hello World"
    //             {...register("formaPago")}
    //           />
    //         </Grid>
    //         <Grid item xs={6} md={3}>
    //           <TextField
    //             id="banco"
    //             //required // le pone un asterisco para saber  que es obligatoria
    //             label="banco"
    //             type="text"
    //             variant="outlined"
    //             error={errors.banco ? true : false}
    //             helperText={errors.banco && errors.banco.message}
    //             //variant="outlined"
    //             //defaultValue="Hello World"
    //             {...register("banco")}
    //           />
    //         </Grid>
    //         <Grid item xs={6} md={3}>
    //           <TextField
    //             id="fechaAplica"
    //             //required // le pone un asterisco para saber  que es obligatoria
    //             label="fechaAplica"
    //             type="date"
    //             variant="outlined"
    //             InputLabelProps={{
    //               shrink: true,
    //             }}
    //             error={errors.fechaAplica ? true : false}
    //             helperText={errors.fechaAplica && errors.fechaAplica.message}
    //             //variant="outlined"
    //             //defaultValue="Hello World"
    //             {...register("fechaAplica", {
    //               required: { value: true, message: "requerido" },
    //               // maxLength: { value: 15, message: "nombre muy largo" },
    //             })}
    //           />
    //         </Grid>
    //         <Grid item xs={6} md={3}>
    //           <TextField
    //             id="chequeNumero"
    //             //required // le pone un asterisco para saber  que es obligatoria
    //             label="cheque Numero"
    //             type="text"
    //             variant="outlined"
    //             error={errors.chequeNumero ? true : false}
    //             helperText={errors.chequeNumero && errors.chequeNumero.message}
    //             //variant="outlined"
    //             //defaultValue="Hello World"
    //             {...register("chequeNumero")}
    //           />
    //         </Grid>
    //       </Grid>

    //       <Box sx={{ m: 1 }} />

    //       <Box>
    //         <Button
    //           variant="contained"
    //           type="reset"
    //           onClick={() => {
    //             clearErrors();
    //             reset();
    //           }}
    //         >
    //           Cancelar
    //         </Button>
    //         {"   "}
    //         <LoadingButton
    //           color="secondary"
    //           loading={loading}
    //           loadingPosition="start"
    //           startIcon={<SaveIcon />}
    //           variant="contained"
    //           type="submit"
    //         >
    //           Save
    //         </LoadingButton>
    //       </Box>
    //     </Box>
    //     <Box sx={{ m: 1 }} />

    //     <Typography variant="body1" sx={{ color: "red" }}>
    //       {values.error}
    //     </Typography>

    //     <ReactToPrint
    //       trigger={() => <button>Print this out!</button>}
    //       content={() => componentRef.current}
    //     />
    //   </Box>
    <div> </div>
  );
};

export default InvoiceDetail;
