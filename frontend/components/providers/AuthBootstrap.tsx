"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "@/slicer/authSlicer";
import type { AppDispatch } from "@/store/auth.store";

export default function AuthBootstrap() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return null;
}
