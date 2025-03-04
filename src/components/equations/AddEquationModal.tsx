"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { Equation, Variable } from "@/types/equation";
import Formula from "@/components/ui/Formula";

interface AddEquationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (equation: Omit<Equation, "id" | "createdAt" | "updatedAt">) => void;
}

interface FormInputs {
  name: string;
  latex: string;
  description: string;
  category: string;
  tags: string;
  variables: {
    name: string;
    description: string;
    unit: string;
    defaultValue?: number;
  }[];
}

export default function AddEquationModal({
  isOpen,
  onClose,
  onAdd,
}: AddEquationModalProps) {
  const [previewLatex, setPreviewLatex] = useState("");

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      name: "",
      latex: "",
      description: "",
      category: "",
      tags: "",
      variables: [{ name: "", description: "", unit: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variables",
  });

  const watchLatex = watch("latex");

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    // Convert tags string to array
    const tagsArray = data.tags
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter((tag) => tag !== "");

    const newEquation = {
      name: data.name,
      latex: data.latex,
      description: data.description,
      category: data.category,
      tags: tagsArray,
      variables: data.variables.map((v) => ({
        name: v.name,
        description: v.description,
        unit: v.unit,
        defaultValue: v.defaultValue,
      })),
    };

    onAdd(newEquation);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Add New Equation</h2>
            <button onClick={onClose} className="btn btn-sm btn-circle">
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Equation Name</span>
              </label>
              <input
                type="text"
                className={`input input-bordered w-full ${
                  errors.name ? "input-error" : ""
                }`}
                placeholder="e.g. Pythagoras Theorem"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="label-text-alt text-error mt-1">
                  Name is required
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">LaTeX Formula</span>
                <button
                  type="button"
                  className="label-text-alt btn btn-xs"
                  onClick={() => setPreviewLatex(watchLatex)}
                >
                  Preview
                </button>
              </label>
              <input
                type="text"
                className={`input input-bordered w-full ${
                  errors.latex ? "input-error" : ""
                }`}
                placeholder="e.g. E = mc^2"
                {...register("latex", { required: true })}
              />
              {errors.latex && (
                <span className="label-text-alt text-error mt-1">
                  LaTeX formula is required
                </span>
              )}

              {previewLatex && (
                <div className="mt-2 p-4 bg-base-200 rounded-box flex justify-center">
                  <Formula equation={previewLatex} block />
                </div>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="Describe what this equation represents..."
                {...register("description")}
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  placeholder="e.g. Physics"
                  {...register("category")}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Tags (comma-separated)</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  placeholder="e.g. physics, energy, einstein"
                  {...register("tags")}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Variables</h3>
                <button
                  type="button"
                  className="btn btn-sm btn-outline"
                  onClick={() =>
                    append({ name: "", description: "", unit: "" })
                  }
                >
                  Add Variable
                </button>
              </div>

              {fields.map((field, index) => (
                <div key={field.id} className="card bg-base-200 p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Variable {index + 1}</h4>
                    {fields.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-sm btn-circle btn-ghost"
                        onClick={() => remove(index)}
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Symbol</span>
                      </label>
                      <input
                        type="text"
                        className={`input input-bordered w-full ${
                          errors.variables?.[index]?.name ? "input-error" : ""
                        }`}
                        placeholder="e.g. E"
                        {...register(`variables.${index}.name` as const, {
                          required: true,
                        })}
                      />
                      {errors.variables?.[index]?.name && (
                        <span className="label-text-alt text-error mt-1">
                          Symbol is required
                        </span>
                      )}
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Unit</span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="e.g. m/s"
                        {...register(`variables.${index}.unit` as const)}
                      />
                    </div>

                    <div className="form-control md:col-span-2">
                      <label className="label">
                        <span className="label-text">Description</span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="e.g. Energy"
                        {...register(`variables.${index}.description` as const)}
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">
                          Default Value (optional)
                        </span>
                      </label>
                      <input
                        type="number"
                        step="any"
                        className="input input-bordered w-full"
                        placeholder="e.g. 9.8"
                        {...register(
                          `variables.${index}.defaultValue` as const,
                          {
                            valueAsNumber: true,
                          }
                        )}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Add Equation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
