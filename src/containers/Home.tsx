/** @jsxRuntime classic /
/* @jsx jsx */
/** @jsxImportSource @emotion/react */
import { jsx, Theme } from "@emotion/react";
import { FormControlLabel, Stack } from "@mui/material";
import { useState } from "react";

import Switch from "../components/Switch";
import { ISelectOption } from "../types/app.type";

export interface ISwitchOption extends ISelectOption {
  checked?: boolean;
}

const fields: ISelectOption[] = [
  {
    value: "none",
    label: "Aucune"
  },
  {
    value: "okr",
    label: "Objectif"
  },
  {
    value: "driver",
    label: "Drivers & Impact"
  },
  {
    value: "owner",
    label: "Owner"
  },
  {
    value: "leader",
    label: "Leader"
  },
  {
    value: "team",
    label: "Equipe"
  },
  {
    value: "role",
    label: "Rôle"
  },
  {
    value: "user",
    label: "User"
  },
  {
    value: "product",
    label: "Produit"
  },
  {
    value: "problematic",
    label: "Problématique"
  },
  {
    value: "feature",
    label: "Feature"
  },
  {
    value: "type",
    label: "Deadline"
  },
  {
    value: "dependentSubject",
    label: "Sujet avec dépendance"
  },
  {
    value: "confiance",
    label: "Confiance"
  }
];

const classes = {
  formControl: (theme: Theme) => ({
    "&.MuiFormControlLabel-root": {
      marginLeft: 0,
      marginRight: 0
    },
    "& .MuiSwitch-root ": {
      order: 2
    },
    "& .MuiFormControlLabel-label": {
      color: theme.palette.grey[800],
      fontSize: 14,
      lineHeight: 1,
      fontWeight: 400
    }
  })
};

const Home = () => {
  const [options, setOptions] = useState<ISwitchOption[]>(
    fields.map(
      (field: ISelectOption): ISwitchOption => ({ ...field, checked: false })
    )
  );

  const handleCheck = (value: string) => {
    setOptions((prev: ISwitchOption[]): ISwitchOption[] => {
      const newFields = prev.map(
        (field: ISwitchOption): ISwitchOption => {
          if (value === field.value) {
            return { ...field, checked: !field.checked };
          }

          return field;
        }
      );

      return newFields;
    });
  };

  console.log("options", options);

  return (
    <div className="flexCenter" css={{ padding: 20 }}>
      <div className="flexCenter" css={{ minWidth: 290 }}>
        <Stack spacing={2.6} className="stretchSelf">
          {options.map((field: ISwitchOption, index: number) => (
            <FormControlLabel
              key={field.value + index}
              control={<Switch />}
              css={classes.formControl}
              onChange={() => handleCheck(field.value)}
              value={field.checked}
              className="flexRow spaceBetween"
              label={field.label}
            />
          ))}
        </Stack>
      </div>
    </div>
  );
};

export default Home;
