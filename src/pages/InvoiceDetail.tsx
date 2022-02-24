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
import DeleteIcon from "@mui/icons-material/Delete";
import FormHelperText from "@mui/material/FormHelperText";
import { useRef, useState } from "react";
import { selectCorreo } from "../app/mainStateSlice";
import { useAppSelector } from "../app/hooks";
import ReactToPrint from "react-to-print";
import { useParams } from "react-router-dom";

interface IFormInput {
  //firstName: string;
  tipoComprobante: string;
  numero: string;
  codigoPuc: string;
  concepto: string;
  valor: number;
  observaciones: string;
  formaPago: string;
  banco: string;
  fechaAplica: string;
  chequeNumero: string;
}

interface IValues {
  error: null | string;
}

type FormValues = {
  tipoComprobante: string;
  numero: string;
  observaciones: string;
  formaPago: string;
  banco: string;
  fechaAplica: string;
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

const NewInvoice: React.FC = (): JSX.Element => {
  // let location: any = useLocation();
  // //si hubo una ruta anterio la pone en la variable, en caso contrario lleva a la pronmcipal
  // let from = location.state?.from?.pathname || "/";

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [values, setValues] = useState<IValues>({
    error: null,
  });

  let { numero } = useParams();

  const componentRef = useRef(null);
  //const [items, setItems] = useState<Array<any>>([]);

  const {
    register,
    handleSubmit,
    //watch, // console.log(watch("example")); // watch input value by passing the name of it, and then it can trigger actions if changes
    formState: { errors },
    clearErrors,
    reset,
    control,
  } = useForm<FormValues>();

  const {
    fields,
    append,
    remove, //swap, move,  prepend,insert
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "lista", // unique name for your Field Array
  });

  const correoUsuarioActual = useAppSelector(selectCorreo);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    //console.log(data);

    const resultado = {
      ...data,
      fechaCreacion: new Date(),
      usuarioCreacion: correoUsuarioActual,
    };
    alert(JSON.stringify(resultado));
  };

  return (
    <Box
    //center all the text fileds indie the div
    >
      <Typography
        variant="h1"
        component="h1"
        align="center"
        fontSize={30}
        fontWeight="bold"
        gutterBottom
      >
        Comprobante egreso
      </Typography>

      <Box
        ref={componentRef}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
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
          container //grid contenedor que define prorpiedades de la grilla
          //spacing={1}
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 2 }}
        >
          <Grid item xs={6} md={6} textAlign={"center"}>
            <FormControl fullWidth>
              <InputLabel id="tipoComprobante-label">
                Tipo Comprobante
              </InputLabel>
              <Select
                autoWidth={true}
                //sx={{ width: "max-content" }}
                labelId="tipoComprobante-label"
                id="tipoComprobante"
                error={errors.tipoComprobante && true}
                //value={age}
                label="tipoComprobante"
                {...register("tipoComprobante", {
                  required: { value: true, message: "requerido" },
                  // maxLength: { value: 15, message: "nombre muy largo" },
                })}
                //onChange={handleChange}
              >
                <MenuItem value={"Egreso"}>Egreso</MenuItem>
                <MenuItem value={"aaaa"}>aaaa</MenuItem>
                <MenuItem value={"bbbbb"}>bbbbb</MenuItem>
              </Select>
              <FormHelperText error={errors.tipoComprobante && true}>
                {errors.tipoComprobante && errors.tipoComprobante.message}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={6}>
            <TextField
              id="numero"
              //required // le pone un asterisco para saber  que es obligatoria
              label="numero"
              type="text"
              variant="outlined"
              error={errors.numero ? true : false}
              helperText={errors.numero && errors.numero.message}
              //variant="outlined"
              //defaultValue="Hello World"
              {...register("numero", {
                required: { value: true, message: "requerido" },
                // maxLength: { value: 15, message: "nombre muy largo" },
              })}
            />
          </Grid>
          <Grid item xs={12}>
            <Box //sx={{ border: 1, borderColor: "primary.main" }}
            >
              <Grid
                container //grid contenedor que define prorpiedades de la grilla
                //spacing={1}
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 2 }}
              >
                <Grid item xs={6} md={3}>
                  <TextField
                    id="codigoPuc"
                    //required // le pone un asterisco para saber  que es obligatoria
                    label="codigoPuc"
                    type="text"
                    variant="outlined"
                    error={errors.codigoPuc ? true : false}
                    helperText={errors.codigoPuc && true}
                    //variant="outlined"
                    //defaultValue="Hello World"
                    {...register("codigoPuc", {
                      required: { value: true, message: "requerido" },
                      // maxLength: { value: 15, message: "nombre muy largo" },
                    })}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <TextField
                    id="concepto"
                    //required // le pone un asterisco para saber  que es obligatoria
                    label="concepto"
                    type="text"
                    variant="outlined"
                    error={errors.concepto ? true : false}
                    helperText={errors.concepto && true}
                    //variant="outlined"
                    //defaultValue="Hello World"
                    {...register("concepto", {
                      required: { value: true, message: "requerido" },
                      // maxLength: { value: 15, message: "nombre muy largo" },
                    })}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <TextField
                    id="valor"
                    //required // le pone un asterisco para saber  que es obligatoria
                    label="valor"
                    type="number"
                    variant="outlined"
                    error={errors.valor ? true : false}
                    helperText={errors.valor && true}
                    //variant="outlined"
                    //defaultValue="Hello World"
                    {...register("valor", {
                      required: { value: true, message: "requerido" },
                      // maxLength: { value: 15, message: "nombre muy largo" },
                    })}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          {fields.map((item: any, index: number) => {
            return (
              <Grid item xs={12} key={item.id}>
                <Box
                  key={item.id}
                  //sx={{ border: 1, backgroundColor: "primary.light" }}
                >
                  <Grid
                    container //grid contenedor que define prorpiedades de la grilla
                    //spacing={1}
                    key={item.id}
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 2 }}
                  >
                    <Grid item xs={6} md={3} key={item.id}>
                      <TextField
                        id={`codigoPuc${index}`}
                        //required // le pone un asterisco para saber  que es obligatoria
                        label={`codigoPuc${index}`}
                        type="text"
                        variant="outlined"
                        error={errors?.lista?.[index]?.codigoPuc ? true : false}
                        helperText={
                          errors?.lista?.[index]?.codigoPuc &&
                          errors?.lista?.[index]?.codigoPuc?.message
                        }
                        //variant="outlined"
                        //defaultValue="Hello World"

                        {...register(`lista.${index}.codigoPuc` as const, {
                          required: { value: true, message: "requerido" },
                          // maxLength: { value: 15, message: "nombre muy largo" },
                        })}
                      />
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <TextField
                        id={`concepto${index}`}
                        //required // le pone un asterisco para saber  que es obligatoria
                        label={`concepto${index}`}
                        type="text"
                        variant="outlined"
                        error={errors?.lista?.[index]?.concepto ? true : false}
                        helperText={
                          errors?.lista?.[index]?.concepto &&
                          errors?.lista?.[index]?.concepto?.message
                        }
                        //variant="outlined"
                        //defaultValue="Hello World"
                        {...register(`lista.${index}.concepto` as const, {
                          required: { value: true, message: "requerido" },
                          // maxLength: { value: 15, message: "nombre muy largo" },
                        })}
                      />
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <TextField
                        id={`valor${index}`}
                        //required // le pone un asterisco para saber  que es obligatoria
                        label={`valor${index}`}
                        type="number"
                        variant="outlined"
                        error={errors?.lista?.[index]?.valor ? true : false}
                        helperText={
                          errors?.lista?.[index]?.valor &&
                          errors?.lista?.[index]?.valor?.message
                        }
                        //variant="outlined"
                        //defaultValue="Hello World"
                        {...register(`lista.${index}.valor` as const, {
                          required: { value: true, message: "requerido" },
                          // maxLength: { value: 15, message: "nombre muy largo" },
                        })}
                      />
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <IconButton
                        aria-label="delete"
                        type="button"
                        color="secondary"
                        size="large"
                        onClick={() => remove(index)}
                      >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            );
          })}

          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              //justifyContent: "right",
              alignItems: "end",
            }}
          >
            <Button
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              type="button"
              variant="contained"
              onClick={() =>
                append({
                  codigoPuc: "",
                  concepto: "",
                  valor: undefined,
                })
              }
            >
              Agregar
            </Button>
          </Grid>

          <Grid item xs={6} md={3}>
            <TextField
              id="observaciones"
              //required // le pone un asterisco para saber  que es obligatoria
              label="observaciones"
              type="text"
              variant="outlined"
              error={errors.observaciones ? true : false}
              helperText={errors.observaciones && errors.observaciones.message}
              //variant="outlined"
              //defaultValue="Hello World"
              {...register("observaciones", {
                required: { value: true, message: "requerido" },
                // maxLength: { value: 15, message: "nombre muy largo" },
              })}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextField
              id="formaPago"
              //required // le pone un asterisco para saber  que es obligatoria
              label="forma Pago"
              type="text"
              variant="outlined"
              error={errors.formaPago ? true : false}
              helperText={errors.formaPago && errors.formaPago.message}
              //variant="outlined"
              //defaultValue="Hello World"
              {...register("formaPago", {
                required: { value: true, message: "requerido" },
                // maxLength: { value: 15, message: "nombre muy largo" },
              })}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextField
              id="banco"
              //required // le pone un asterisco para saber  que es obligatoria
              label="banco"
              type="text"
              variant="outlined"
              error={errors.banco ? true : false}
              helperText={errors.banco && errors.banco.message}
              //variant="outlined"
              //defaultValue="Hello World"
              {...register("banco", {
                required: { value: true, message: "requerido" },
                // maxLength: { value: 15, message: "nombre muy largo" },
              })}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextField
              id="fechaAplica"
              //required // le pone un asterisco para saber  que es obligatoria
              label="fechaAplica"
              type="date"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              error={errors.fechaAplica ? true : false}
              helperText={errors.fechaAplica && errors.fechaAplica.message}
              //variant="outlined"
              //defaultValue="Hello World"
              {...register("fechaAplica", {
                required: { value: true, message: "requerido" },
                // maxLength: { value: 15, message: "nombre muy largo" },
              })}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextField
              id="chequeNumero"
              //required // le pone un asterisco para saber  que es obligatoria
              label="cheque Numero"
              type="text"
              variant="outlined"
              error={errors.chequeNumero ? true : false}
              helperText={errors.chequeNumero && errors.chequeNumero.message}
              //variant="outlined"
              //defaultValue="Hello World"
              {...register("chequeNumero", {
                required: { value: true, message: "requerido" },
                // maxLength: { value: 15, message: "nombre muy largo" },
              })}
            />
          </Grid>
        </Grid>

        <Box sx={{ m: 1 }} />

        <Box>
          <Button variant="contained" type="submit">
            Grabar
          </Button>
          {"   "}
          <Button
            variant="contained"
            type="reset"
            onClick={() => {
              clearErrors();
              reset();
            }}
          >
            Cancelar
          </Button>
        </Box>
      </Box>
      <Box sx={{ m: 1 }} />

      <Typography variant="body1" sx={{ color: "red" }}>
        {values.error}
      </Typography>

      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
    </Box>
  );
};

export default NewInvoice;
